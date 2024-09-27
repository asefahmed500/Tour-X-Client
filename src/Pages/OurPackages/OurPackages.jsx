import { Helmet } from "react-helmet-async";
import usePackage from "../../Hooks/usePackage";
import HIKINGIMG from "../../assets/BGIMAGE/HIKING.jpg"
import AIRRIDESIMG from "../../assets/BGIMAGE/AIRRIDES.jpg"
import OFFEREDIMG from "../../assets/BGIMAGE/OFFERED.jpg"
import SPORTSIMG from "../../assets/BGIMAGE/SPORTS.jpg"
import WALKINGIMG from "../../assets/BGIMAGE/WALKING.jpg"
import WILDLIFEIMG from "../../assets/BGIMAGE/WILDLIFE.jpg"
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import OurPackagescart from "./OurPackagescart";
import Cover from "../../Shared/Cover/Cover";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const OurPackages = () => {
    const [packages] = usePackage();
 
    console.log(packages); 
    const HIKING = packages.filter(packagetype => packagetype.tourType === 'HIKING')
    const WALKING = packages.filter(packagetype => packagetype.tourType === 'WALKING')
    const SPORTS = packages.filter(packagetype => packagetype.tourType === 'SPORTS')
    const OFFERED = packages.filter(packagetype => packagetype.tourType === 'OFFERED')
    const WILDLIFE = packages.filter(packagetype => packagetype.tourType === 'WILDLIFE')
    const AIRRIDES = packages.filter(packagetype => packagetype.tourType === 'AIRRIDES')
    return (
        <div>
            <Helmet>
                <title>Packages</title>
            </Helmet>
            <NavBar></NavBar>
            <Cover img={OFFEREDIMG} title="Our Package " ></Cover>
            <SectionTitle
            headings="Todsy's Offer "
            subheadings="Don't Mioss it ">

            </SectionTitle>
            <OurPackagescart items={OFFERED} covering={OFFEREDIMG}></OurPackagescart>

            {/* HIKING */}
            <OurPackagescart 
            items={HIKING} 
            title="HIKING"
            covering={HIKINGIMG}
            ></OurPackagescart>



            {/* WALKING */}

            <OurPackagescart 
            items={WALKING} 
            title="WALKING"
            covering={WALKINGIMG}
            ></OurPackagescart>

            {/* SPORTS */}

            <OurPackagescart 
            items={SPORTS} 
            title="SPORTS"
            covering={SPORTSIMG}
            ></OurPackagescart>
            {/* WILDLIFE */}

            <OurPackagescart 
            items={WILDLIFE} 
            title="WILDLIFE"
            covering={WILDLIFEIMG}
            ></OurPackagescart>
            {/* AIRRIDES */}

            <OurPackagescart 
            items={AIRRIDES} 
            title="AIRRIDES"
            covering={AIRRIDESIMG}
            ></OurPackagescart>
            

            <Footer></Footer>

        </div>
    );
};

export default OurPackages;