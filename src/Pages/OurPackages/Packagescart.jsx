

const Packagescart = ({ item }) => {
    const { name, tourType, description, price, image } = item; // Use `item` here
    return (
        <div className="flex space-x-4 ">
            <img style={{ borderRadius: '0 200px 200px 200px' }} className="w-[100px]" src={image} alt="" />
            <div>
                <h3 className="uppercase">{name}----------------</h3>
                <p>{description}</p>
                <h2>{tourType}</h2>
            </div>
            <p className="text-yellow-500">${price}</p>
        </div>
    );
};

export default Packagescart;
