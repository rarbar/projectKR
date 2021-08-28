
type PropsType = {
    inputHeader: string
    inputText: string
}

export const SuperInputText = (props: PropsType) => {
    return (
        <div>{props.inputHeader}</div>
    )
}

