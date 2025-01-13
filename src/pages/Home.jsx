import { useContext } from "react";
import Carousel from "../components/swiper/Carousel";
import TabCategories from '../components/TabCategories';
import { AuthContext } from "../provider/AuthProvider";
const Home = () => {
    const {loading} = useContext(AuthContext);
    if(loading){
       return <div className="flex justify-center mt-60 md:mt-72 xl:mt-96">
            <span className="loader"></span>
        </div>
    }
    return (
        <div>
            <Carousel></Carousel>
            <TabCategories></TabCategories>
        </div>
    );
};

export default Home;