const FormInput = ({label, placeholder, type, onChange}) => {
    return (
        <div className="w-96 h-14 gap-2 justify-center pb-[65px] ">
            <h2 className="text-left mb-2 text-black opacity-90 h-5 text-base"> {label} </h2>
            <input className="border shadow-sm w-96 h-8" type={type} placeholder= {placeholder} onChange={onChange}/>
        </div>
    );
}

export default FormInput;