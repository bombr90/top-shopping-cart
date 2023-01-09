import './styles/index.css';
import Header from './components/Header';
import Main from './components/Home/Main';
import Footer from './components/Footer'

function Home() {
  return (
    <div className="home">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default Home;
