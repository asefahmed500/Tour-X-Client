import SectionTitle from "../SectionTitle/SectionTitle";

const AboutUs = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <SectionTitle
        headings="About Us"
        subheadings="Travel with us "
        
        >

        </SectionTitle>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Welcome to Tour X, your ultimate travel guide to Bangladesh! We provide comprehensive
          information on popular tourist destinations, helping travelers plan their trips with ease.
          Whether you’re exploring famous landmarks or uncovering hidden gems, we’ve got all the
          details to make your visit unforgettable.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          At Tour X, we believe that travel is more than just sightseeing. Our platform offers
          insights into local culture, cuisine, and activities, enriching your experience and helping
          you immerse in the vibrant beauty of Bangladesh. Discover the stories behind the
          destinations, the flavors of the local food, and the traditions that make this country unique.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          Let us guide you on your journey through Bangladesh, ensuring that your adventure is both
          enjoyable and memorable. From planning to exploring, Tour X is here to help you every
          step of the way!
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
