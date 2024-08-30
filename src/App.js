import { useLocation } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import MenuLeft from './Components/MenuLeft';

function App(props) {
  // console.log(props)  lấy props từ index
  const hideLeftBar = [
    "/register",
    "/login"
  ]
  const location = useLocation()
  // console.log(location.pathname)
  
  return (
    <>
      <Header/>
      <section>
		<div className="container">
			<div className="row">
      {hideLeftBar.includes(location.pathname ) ? <></>:<MenuLeft/> }
        {props.children}
				
			</div>
		</div>
	</section>
      <Footer/>
    </>
  );
}

export default App;
