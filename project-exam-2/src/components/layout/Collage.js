import collage1 from "../../images/collage-1.jpg";
import collage2 from "../../images/collage-2.jpg";
import collage3 from "../../images/collage-3.jpg";
import collage4 from "../../images/collage-4.jpg";
import collage5 from "../../images/collage-5.jpg";
import collage6 from "../../images/collage-6.jpg";
import collage7 from "../../images/collage-7.jpg";
import collage8 from "../../images/collage-8.jpg";
import collage9 from "../../images/collage-9.jpg";

function Collage() {
  return (
    <div className="collage-container">
      <img src={collage3} alt="image3" className="image-3" />
      <img src={collage8} alt="image8" className="image-8" />
      <img src={collage6} alt="image6" className="image-6" />
      <img src={collage1} alt="image1" className="image-1" />
      <img src={collage5} alt="image5" className="image-5" />
      <img src={collage2} alt="image2" className="image-2" />
      <img src={collage7} alt="image7" className="image-7" />
      <img src={collage4} alt="image4" className="image-4" />
      <img src={collage9} alt="image9" className="image-9" />
    </div>
  );
}

export default Collage;
