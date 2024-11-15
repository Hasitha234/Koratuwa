import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/MainPage";
import DashBoard from "./pages/DashBoard";
import MainStore from "./pages/MainStore";
import PackingStore from "./pages/PackingStore";
import StoreIn from "./pages/StoreIn";
import StoreOut from "./pages/StoreOut";
import PackingIn from "./pages/PackingIn";
import PackingOut from "./pages/PackingOut";
import DriedChilli from "./pages/DriedChillie";
import DriedTurmeric from "./pages/DriedTurmeric";
import PepperSeeds from "./pages/PepperSeeds";
import PepperPowder from "./pages/PepperPowder"; // Import PepperPowder component
import PackPepperPowder from "./pages/PackPepperPowder"; // Import PackPepperPowder component
import Cinnamon from "./pages/Cinnamon";
import Gamboge from "./pages/Gamboge";
import FennelSeeds from "./pages/FennelSeeds";
import Heenduru from "./pages/Heenduru";
import Coriander from "./pages/Coriander";
import Mustard from "./pages/Mustard";
import Fenugreek from "./pages/Fenugreek";
import Cardamom from "./pages/Cardamom";
import NutmegFlowers from "./pages/NutmegFlowers";
import Nutmeg from "./pages/Nutmeg";
import Cloves from "./pages/Cloves";
import CinnamonSticks from "./pages/CinnamonSticks";
import Ginger from "./pages/Ginger";
import Dhal from "./pages/Dhal";
import Rice from "./pages/Rice";
import ChilliPieces from "./pages/PackChilliPieces";
import ChilliPowder from "./pages/PackChilliPowder";
import TurmericPowder from "./pages/PackTurmericPowder";
import CurryPowder from "./pages/PackCurryPowder";
import FriedCurryPowder from "./pages/PackFriedCurryPowder";
import MeatCurryPowder from "./pages/PackMeatCurry";
import MustardPowder from "./pages/PackMustardPowder";
import MustardSeeds from "./pages/PackMustardSeeds";
import TeaPowder from "./pages/PackTeaPowder";
import ClovePacks from "./pages/PackClovesPacks";
import CardamomPacks from "./pages/PackCardamomPacks";
import SuwadaHatha from "./pages/PackSuwadaHatha";
import FenugreekPack from "./pages/PackFenugreek";
import BillInfo from "./pages/BillInfo";
import Reports from "./pages/Reports";
import CinnamonPack from "./pages/PackCinnamon";
import GambogePack from "./pages/PackGamboge";
import BillHome from "./pages/BillHome";
import BillViews from "./pages/BillViews";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<DashBoard />} />
        <Route path="/MainStore" element={<MainStore />} />
        <Route path="/PackingStore" element={<PackingStore />} />
        <Route path="/store-in" element={<StoreIn />} />
        <Route path="/packing-in" element={<PackingIn />} />
        <Route path="/store-out" element={<StoreOut />} />
        <Route path="/packing-out" element={<PackingOut />} />
        <Route path="/BillInfo" element={<BillInfo />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/dried-chilli" element={<DriedChilli />} />
        <Route path="/dried-turmeric" element={<DriedTurmeric />} />
        <Route path="/pepper-seeds" element={<PepperSeeds />} />
        <Route path="/pepper-powder" element={<PepperPowder />} />
        <Route path="/pepper-powder-pack" element={<PackPepperPowder />} /> {/* Updated route */}
        <Route path="/cinnamon" element={<Cinnamon />} />
        <Route path="/gamboge" element={<Gamboge />} />
        <Route path="/fennel-seeds" element={<FennelSeeds />} />
        <Route path="/heenduru" element={<Heenduru />} />
        <Route path="/coriander" element={<Coriander />} />
        <Route path="/mustard" element={<Mustard />} />
        <Route path="/fenugreek" element={<Fenugreek />} />
        <Route path="/cardamom" element={<Cardamom />} />
        <Route path="/nutmeg-flowers" element={<NutmegFlowers />} />
        <Route path="/nutmeg" element={<Nutmeg />} />
        <Route path="/cloves" element={<Cloves />} />
        <Route path="/cinnamon-sticks" element={<CinnamonSticks />} />
        <Route path="/ginger" element={<Ginger />} />
        <Route path="/dhal" element={<Dhal />} />
        <Route path="/rice" element={<Rice />} />
        <Route path="/chilli-pieces" element={<ChilliPieces />} />
        <Route path="/chilli-powder" element={<ChilliPowder />} />
        <Route path="/turmeric-powder" element={<TurmericPowder />} />
        <Route path="/curry-powder" element={<CurryPowder />} />
        <Route path="/fried-curry-powder" element={<FriedCurryPowder />} />
        <Route path="/meat-curry-powder" element={<MeatCurryPowder />} />
        <Route path="/mustard-powder" element={<MustardPowder />} />
        <Route path="/mustard-seeds" element={<MustardSeeds />} />
        <Route path="/tea-powder" element={<TeaPowder />} />
        <Route path="/clove-packs" element={<ClovePacks />} />
        <Route path="/cardamom-packs" element={<CardamomPacks />} />
        <Route path="/suwada-hatha" element={<SuwadaHatha />} />
        <Route path="/fenugreek-pack" element={<FenugreekPack />} />
        <Route path="/cinnamon-pack" element={<CinnamonPack />} />
        <Route path="/gamboge-pack" element={<GambogePack />} />
        <Route path="/bill-home" element={<BillHome />} />
        <Route path="/bill-views" element={<BillViews />} />

        
      </Routes>
    </Router>
  );
}

export default App;
