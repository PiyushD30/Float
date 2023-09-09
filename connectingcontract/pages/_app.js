import "../styles/globals.css";

//intenal import
import { NavBar, Footer } from "../components/componentsindex";
import { NFTMarketplaceProvider } from '../Context/NFTMarketplaceContext';

const MyApp = ({ Component, pageProps }) => {
    return (
        <div>
            <NFTMarketplaceProvider>
                <NavBar />
                <Component {...pageProps} />
                <Footer />
            </NFTMarketplaceProvider>
        </div>
    );
}
export default MyApp;
