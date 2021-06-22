import React from "react";

import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Icons,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
} from "../../UI/";

import noImg from "../../../assets/icons/no-image-icon.png";

import moment from "moment";

const input = (props) => {
  const classes = UseStyles();
  const id = props.id + moment().unix().toString();

  let inputElement = null;

  let valid = false;
  if (!props.valid && props.validation && props.touched) {
    valid = true;
  }

  switch (props.config.type) {
    case "text":
    case "number":
    case "email":
    case "password":
      inputElement = (
        <TextField
          id={id}
          type={props.config.type}
          value={props.value ? props.value : ""}
          variant={props.readOnly ? "filled" : "outlined"}
          margin="normal"
          fullWidth
          onChange={props.changed}
          helperText={valid && props.config.erro}
          error={valid}
          label={props.config.label}
          InputProps={{
            readOnly: props.readOnly,
          }}
          disabled={props.readOnly}
          {...props.override}
        />
      );
      break;
    case "textarea":
    case "numberarea":
      inputElement = (
        <TextField
          id={id}
          type={props.config.type === "textarea" ? "text" : "number"}
          value={props.value ? props.value : ""}
          multiline
          rows={2}
          rowsMax={4}
          variant={props.readOnly ? "filled" : "outlined"}
          margin="normal"
          fullWidth
          onChange={props.changed}
          helperText={valid && props.config.erro}
          error={valid}
          label={props.config.label}
          InputProps={{
            readOnly: props.readOnly,
          }}
          disabled={props.readOnly}
          {...props.override}
        />
      );
      break;
    case "checkbox":
      inputElement = (
        <FormControlLabel
          control={
            <Checkbox
              id={id}
              checked={!!props.value}
              onChange={props.switch}
              color="primary"
            />
          }
          label={props.config.label}
          {...props.override}
        />
      );
      break;
    case "date":
      inputElement = (
        <FormControl
          fullWidth
          margin="normal"
          variant={props.readOnly ? "filled" : "outlined"}
          className={classes.formControl}
          disabled={props.readOnly}
        >
          <TextField
            id={id}
            type={props.config?.type}
            defaultValue={
              moment(props.value, "YYYY-MM-DD").toString() !== "Invalid date"
                ? moment(props.value, "YYYY-MM-DD")
                : ""
            }
            onChange={props.changed}
            label={props.config?.label}
            variant={props.readOnly ? "filled" : "outlined"}
            InputProps={{
              readOnly: props.readOnly,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            {...props.override}
          />
        </FormControl>
      );
      break;
    case "select":
      inputElement = (
        <FormControl
          fullWidth
          margin="normal"
          variant={props.readOnly ? "filled" : "outlined"}
          className={classes.formControl}
          disabled={props.readOnly}
        >
          <InputLabel id={id + "-label"}>{props.config?.label}</InputLabel>
          <Select
            labelId={id + "-label"}
            id={id}
            value={props.value ? props.value : ""}
            onChange={props.changed}
            label={props.config?.label}
            {...props.override}
          >
            <MenuItem value="">
              <em>Selecione</em>
            </MenuItem>
            {props.config.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.displayValue}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
      break;
    case "select-multiple":
      inputElement = (
        <FormControl
          fullWidth
          margin="normal"
          variant={props.readOnly ? "filled" : "outlined"}
          className={classes.formControl}
          disabled={props.readOnly}
        >
          <InputLabel id={id + "-label"}>{props.config?.label}</InputLabel>
          <Select
            labelId={id + "-label"}
            id={id}
            multiple
            value={props.value ? props.value : []}
            onChange={props.changed}
            // input={<Input />}
            label={props.config?.label}
            renderValue={(selected) =>
              selected
                .map(function (item) {
                  let option = props.config.options.find(
                    (opt) => opt.value === item
                  );
                  return option ? option.displayValue : item;
                })
                .join(", ")
            }
            {...props.override}
          >
            {props.config.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox checked={props.value?.indexOf(option.value) > -1} />
                <ListItemText primary={option.displayValue} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
      break;
    case "img":
      inputElement = props.readOnly ? null : (
        <div className={classes.img}>
          <input
            id={id}
            type="file"
            accept="image/*"
            className={classes.inputFile}
            onChange={props.upload}
            {...props.override}
          />
          <label htmlFor={id}>
            <Button
              variant="contained"
              color="secondary"
              component="span"
              disabled={props.readOnly}
            >
              <Icons.PhotoCamera />
            </Button>
          </label>
        </div>
      );
      break;
    default:
      inputElement = (
        <b>
          Invalid Field:{" "}
          {props.config?.type ? props.config?.type : "missing type"}
        </b>
      );
  }

  return (
    <div className={classes.Input}>
      {props.config?.type === "img" ? (
        <div className={classes.img}>
          <img
            src={props.value ? props.value : noImg}
            height={props.config?.height ? props.config?.height : "150"}
            width={props.config?.width ? props.config?.width : "150"}
            alt={props.config?.alt ? props.config?.alt : "no img"}
          />
        </div>
      ) : null}
      {inputElement}
    </div>
  );
};

const UseStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  img: {
    textAlign: "center",
  },
  inputFile: {
    display: "none",
  },
}));

export default input;
