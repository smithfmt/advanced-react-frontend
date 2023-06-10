import { useState } from "react";

const useForm = (initial: any = {}) => {
    const [inputs, setInputs] = useState(initial)
    const handleChange = (e: any) => {
        let { value, name, type } = e.target;
        if (type === "number") {
            value = parseInt(value);
        };
        if (type === "file") {
            [value] = e.target.files;
        };
        setInputs({
            ...inputs,
            [name]: value,
        })
    };

    const resetForm = () => {
        setInputs(initial);
    };

    const clearForm = () => {
        setInputs(Object.fromEntries(Object.entries(inputs).map(([key]) => [key, ""])));
    };

    return {
        inputs,
        handleChange,
        resetForm,
        clearForm
    };
};

export default useForm;