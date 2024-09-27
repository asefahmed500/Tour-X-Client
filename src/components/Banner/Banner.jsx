import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../assets/banners/img1.jpg"
import img2 from "../../assets/banners/img2.jpg"
import img3 from "../../assets/banners/img3.jpg"
import img4 from "../../assets/banners/img4.jpg"
import img5 from "../../assets/banners/img5.jpg"


const Banner = () => {
    return (
        <div className="mt-8">
             <Carousel >
                <div>
                    <img src={img1}/>
                    
                </div>
                <div>
                    <img src={img2}/>
                    
                </div>
                <div>
                    <img src={img3}/>
                    
                </div>
                <div>
                    <img src={img4}/>
                    
                </div>
                <div>
                    <img src={img5}/>
                    
                </div>
                
            </Carousel>
        </div>
    );
};

export default Banner;