const PopularPackagescart = ({ item }) => {
    const { name, tourType, price, image, description } = item;

    return (
        <div >
            <div className="card bg-base-100 w-80 shadow-xl">
                <figure>
                    <img 
                        src={image}
                        alt={name} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {name}
                        <div className="badge badge-secondary">{tourType}</div>
                    </h2>
                    <p>{description}</p>
                    <h2>{price} BDT</h2>
                   
                </div>
            </div>
        </div>
    );
};

export default PopularPackagescart;