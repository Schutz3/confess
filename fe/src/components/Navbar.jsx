import { Link } from "react-router-dom";
import { CircleHelp, Settings, Coffee} from "lucide-react";

const Navbar = () => {

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            <Link className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <CircleHelp className="w-5 h-5 text-primary" />
              </div>
            </Link>
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <h1 className="text-lg font-bold">Confess-In</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to={"https://saweria.co/aerialsz"} className="btn btn-sm gap-2">
                  <Coffee className="size-5" />
                  <span className="hidden sm:inline">BMAC</span>
            </Link>
            <Link
              to={"/settings"}
              className="btn btn-sm gap-2 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            <Link to={"/about"} className="btn btn-sm gap-2">
                  <CircleHelp className="size-5" />
                  <span className="hidden sm:inline">About</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;