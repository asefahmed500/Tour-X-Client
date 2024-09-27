

const SectionTitle = ({headings , subheadings}) => {
    return (
        <div className="text-center mx-auto md:w-4/12 my-8">
            <p className="text-yellow-500 mb-2 ">{headings}</p>
            <h3 className="text-2xl uppercase border-y-4 py-4">{subheadings}</h3>
            
        </div>
    );
};

export default SectionTitle;