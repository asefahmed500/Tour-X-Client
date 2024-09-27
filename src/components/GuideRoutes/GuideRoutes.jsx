import { Navigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useGuide from "../../Hooks/useGuide";


const GuideRoutes = ({children}) => {
    const { user, loading } = useAuth();
    const [isGuide, isGuideloading] = useGuide();

    console.log("User:", user);
    console.log("Loading:", loading);
    console.log("IsGuide:", isGuide);
    console.log("isGuideloading:", isGuideloading);
    
    if(loading || isGuideloading) {
        return <progress className="progress w-56"></progress>;
    }
    if (user && isGuide) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default GuideRoutes;