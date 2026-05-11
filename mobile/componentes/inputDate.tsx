import DateTimePicker, {
    DateTimePickerEvent
} from '@react-native-community/datetimepicker'

type Props = {
    valor: Date
    onChange: (
        event: DateTimePickerEvent,
        date?: Date
    ) => void
    mostrar: boolean
    setMostrar: (value: boolean) => void
}

const InputDate = ({
    valor,
    onChange,
    mostrar,
    setMostrar
}: Props) => {

    const handleChange = (
        event: DateTimePickerEvent,
        selectedDate?: Date
    ) => {
        setMostrar(false)

        if (selectedDate) {
            onChange(event, selectedDate)
        }
    }

    return (
        <>
            {mostrar && (
                <DateTimePicker
                    value={valor}
                    mode="date"
                    display="default"
                    onChange={handleChange}
                />
            )}
        </>
    )
}

export default InputDate