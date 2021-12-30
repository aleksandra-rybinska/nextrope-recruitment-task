const ValidationMessage = (props: { message: string }) => {
    return (
        <p className='mb-0' style={{ color: 'red' }}>
            {props.message}
        </p>
    );
};

export default ValidationMessage;
