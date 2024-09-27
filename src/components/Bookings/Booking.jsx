import { useParams } from "react-router-dom";
import usePackage from "../../Hooks/usePackage";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import bookimg from "../../assets/BookigImage/Booking.jpg"
import BookingTab from "./BookingTab";

const Booking = () => {
    const tourTypes = ['HIKING', 'WALKING', 'SPORTS', 'OFFERED', 'WILDLIFE', 'AIRRIDES']
    const [packages] = usePackage();
    const { tourType } = useParams();
    console.log(tourType);


    const initialIndex = tourTypes.indexOf(tourType);
    const [tabIndex, setTabIndex] = useState(initialIndex);



    const HIKING = packages.filter(packagetype => packagetype.tourType === 'HIKING')
    const WALKING = packages.filter(packagetype => packagetype.tourType === 'WALKING')
    const SPORTS = packages.filter(packagetype => packagetype.tourType === 'SPORTS')
    const OFFERED = packages.filter(packagetype => packagetype.tourType === 'OFFERED')
    const WILDLIFE = packages.filter(packagetype => packagetype.tourType === 'WILDLIFE')
    const AIRRIDES = packages.filter(packagetype => packagetype.tourType === 'AIRRIDES')
    return (
        <div>
            <Helmet>
                <title>Booking</title>
            </Helmet>
            <Cover img={bookimg} title="Booked Packages"></Cover>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>HIKING</Tab>
                    <Tab>WALKING</Tab>
                    <Tab>SPORTS</Tab>
                    <Tab>OFFERED</Tab>
                    <Tab>WILDLIFE</Tab>
                    <Tab>AIRRIDES</Tab>
                </TabList>

                <TabPanel>
                    <BookingTab items={HIKING}>  </BookingTab>

                </TabPanel>
                <TabPanel>
                    <BookingTab items={WALKING}>  </BookingTab>

                </TabPanel>
                <TabPanel>
                    <BookingTab items={SPORTS}>  </BookingTab>

                </TabPanel>
                <TabPanel>
                    <BookingTab items={OFFERED}>  </BookingTab>

                </TabPanel>
                <TabPanel>
                    <BookingTab items={WILDLIFE}>  </BookingTab>

                </TabPanel>
                <TabPanel>
                    <BookingTab items={AIRRIDES}>  </BookingTab>

                </TabPanel>

            </Tabs>

        </div>
    );
};

export default Booking;