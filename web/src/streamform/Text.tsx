import React from 'react'
import {StreamBlockProps} from "../stream/StreamField";
import {InputAdornment, TextField} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {FieldVisibility} from "./Handler";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from '@material-ui/core/Chip';
import {InputIcon, TextIcon} from "./InputIcon";
import {AddonsDecoratorProps} from "./FormConfig";

export type Validation = "email" | "none"

export interface Props extends AddonsDecoratorProps{
    label: string
    max_length: number
    required: FieldVisibility
    placeholder: string
    validation: Validation
    multiline: boolean
    readonly?: boolean
    size?: "small" | "medium"
    password?: boolean
    minRows?: number
    initial?: string
    selectTags?: string[]
    icon?: TextIcon
    iconComp?: any
    iconText?: string
}

export function Text(props: StreamBlockProps<Props>) {
    const context = props.context.formContext
    const styles = context!!.handler.style
    const data = props.value
    const classes = useStyles()
    const [value, setValue] = React.useState(data.initial || "")
    const [selectedTags, setSelectedTags ] = React.useState(data.initial?.split(" ") || [] as string[] )
    const getActualValue = () => {
        if (data.selectTags) {
            return selectedTags.join(" ")
        }
        return value
    }
    const [focused, setFocused] = React.useState(false)
    const [backendError, setBackendError] = React.useState(undefined as undefined | string)
    const validate: () => string | undefined = () => {
        const localValue = getActualValue()
        if (localValue.length > data.max_length) {
            return "Field is too long"
        }
        if (data.required && localValue.length === 0) {
            return ""
        }
        return undefined
    }
    React.useEffect(() => {
        context!!.setFieldValidity(data.name, validate() === undefined)
        return context!!.register(data.name, {
            collect: (dto) => {
                const localValue = getActualValue()
                dto.data[data.name] = localValue
            },
            clear: () => {
                setValue("")
                setSelectedTags([])
            },
            setError: setBackendError
        })
    }, [value, selectedTags, context])
    if (!context?.isVisible(props.value.required)) {
        return null
    }
    const message = validate()
    let label = ""
    if (data.label) {
        label = data.label + " "
    }
    const lengthLabel = getLengthLabel(getActualValue(), data.max_length)
    if (lengthLabel) {
        label += lengthLabel
    }

    const renderInput = (params: any) => {
        return <TextField
            name={data.name}
            value={value}
            color={styles.color}
            key={data.name}
            size={data.size || "medium"}
            placeholder={data.placeholder}
            type={getType(data)}
            onFocus={() => {
                setFocused(true);
                context!!.setFocused();
            }}
            label={label}
            rows={data.minRows || 4}
            rowsMax={10}
            disabled={data.readonly || context!!.disabled}
            fullWidth
            error={focused && !context!!.disabled && (message !== undefined || backendError !== undefined)}
            helperText={(focused && !context!!.disabled) ? (message || backendError) : undefined}
            variant={styles.variant}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {data.iconComp && data.iconComp}
                        {!data.iconComp && <InputIcon type={data.icon || "inherit"} color={context!!.disabled ? "disabled" : styles.color} />}
                        {data.iconText && <span className={classes.iconText}>{data.iconText}</span>}
                    </InputAdornment>
                ),
            }}
            onChange={(e) => {
                context!!.setInteracted()
                setBackendError(undefined)
                setValue(e.target.value)
            }}
            multiline={data.multiline}
            {...params}
        />
    }
    if (data.selectTags) {
        const values = value.split(" ")
        const options = data.selectTags.filter((single) => {
            return values.indexOf(single) === -1
        })
        return <div className={classes.root}>
            <Autocomplete
                multiple
                className={classes.autocomplete}
                freeSolo
                value={selectedTags}
                onChange={(e,v) => {
                    context!!.setInteracted()
                    setSelectedTags(v.filter(it => data.selectTags!!.indexOf(it) > -1))
                    setValue(v.join(" "))
                }}
                inputValue={value}
                onInputChange={(e,v) => {setValue(v)}}
                id="free-solo-2-demo"
                renderTags={(tags: string[], getTagProps) =>
                    tags.map((option: string, index: number) => {
                        let color: "primary"|"default" = "primary"
                        if (data.selectTags!!.indexOf(option) < 0) {
                            color = "default"
                        }
                        return <Chip variant="outlined" color={color} label={option} {...getTagProps({ index })} />
                    })
                }
                options={options}
                renderInput={renderInput} />
        </div>
    }
    return <div className={classes.root}>
        { renderInput({}) }
    </div>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            width: "100%",
            padding: theme.spacing(1),
        },
        autocomplete: {
            width: "100%"
        },
        iconText: {
            color: theme.palette.grey.A700,
            fontSize: "0.8em",
            padding: theme.spacing(0.5),
            [theme.breakpoints.down("sm")]: {
                display: "none"
            }
        }
    }
})


function getLengthLabel(value: string, max: number): string {
    if (max - value.length < 15) {
        return `${value.length}/${max}`;
    }
    return ""
}

const getType = (data: Props): "email" | "password" | undefined => {
    if (data.validation === "email") {
        return "email";
    }
    if (data.password) {
        return "password";
    }
    return undefined;
};
