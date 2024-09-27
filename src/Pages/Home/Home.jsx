import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";
import FeaturedPlaces from "../../components/FeaturedPlaces/FeaturedPlaces";
import NavBar from "../../components/NavBar/NavBar";
import PopularPackages from "../../components/PopularPackages/PopularPackages";
import Guides from "../../components/Guides/Guides";
import Testimonials from "../../components/Testimonials/Testimonials";
import Footer from "../../components/Footer/Footer";


const Home = () => {
    return (
        <div>
            <Helmet
            title="Home">

            </Helmet>
           
            <NavBar></NavBar>
            <Banner></Banner>
            <FeaturedPlaces></FeaturedPlaces>
            <PopularPackages></PopularPackages>
            <Guides></Guides>
            <Testimonials></Testimonials>
            <Footer></Footer>
        </div>
    );
};

export default Home;