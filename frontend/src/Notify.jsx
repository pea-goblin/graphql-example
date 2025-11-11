const Notify = ({ error }) => {
    if (!error) {
        return null;
    }
    console.log(error);

    return (
        <div className={`${error ? "error" : "notify"} `} >
            {error}
        </div >
    )
}

export default Notify;