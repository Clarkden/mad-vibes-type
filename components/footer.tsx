import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="w-full bg-[#e8eddf] p-5 flex flex-row justify-between items-center">
      Copyright Mad Vibes LA 2020
      <div>
        <a href="https://www.instagram.com/madvibes.la/?hl=en" target="blank">
          <FontAwesomeIcon icon={faInstagram} size="lg" />{" "}
        </a>
      </div>
    </footer>
  );
};

export default Footer
