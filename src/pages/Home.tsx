import { Link } from "react-router-dom";

const Home = () => {

  document.title = "ElecWorld Shop";

  return (
    <div className="container">

      <div className="banner">
        <img src="/images/banner.png"/>
          
        <div className="banner-text">
          <h1>One stop marketplace for all your tech needs</h1>
          <Link to="/shop">
            <button>SHOP NOW</button>
          </Link>
        </div>
      </div>

      <div className="shop-features-section">
        <h2>Why ElecWorld?</h2>

        <div className="shop-features-div">

          <div className="shop-feature-div">
            <img src="/images/computer.png" />
            <div className="shop-feature-div-description">
                <h3>Extensive Selection</h3>
                <p>An extensive selection of high-quality electronics, ranging from the latest smartphones and laptops to cutting-edge gadgets and accessories.</p>
            </div>
          </div>

          <div className="shop-feature-div">
            <img src="/images/quality.png" />
            <div className="shop-feature-div-description">
              <h3>Trusted Quality</h3>
              <p>we prioritize quality and reliability. we aim to provide our customers with electronics that they can trust and enjoy for years to come.</p>
            </div>
          </div>

          <div className="shop-feature-div">
            <img src="/images/price.png" />
            <div className="shop-feature-div-description">
              <h3>Competitive Prices</h3>
              <p>We offer competitive prices on all our products without compromising on quality.</p>
            </div>
          </div>

          <div className="shop-feature-div">
            <img src="/images/search.png" />
            <div className="shop-feature-div-description">
              <h3>Stay Up-to-Date</h3>
              <p>We keep you up-to-date with the latest tech trends and innovations and continuously add new products to our inventory.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="additional-features-section">
        
        <div className="additional-feature-div">
          <div className="additional-feature-div-img-shipping">
              <img src="/images/free-shipping.png" alt="" width="40"/>
          </div>
          
          <div className="additional-feature-div-description">
            <h3>Free Shipping</h3>
            <p>Free shipping on order</p>
          </div>
        </div>

        <div className="additional-feature-div">
          <div className="additional-feature-div-img-support">
            <img src="/images/support.png" alt="" width="40"/>
          </div>
              
          <div className="additional-feature-div-description">
            <h3>Support 24/7</h3>
            <p>Contact us 24 hrs a day</p>
          </div>
        </div>

        <div className="additional-feature-div">
          <div className="additional-feature-div-img-payment">
            <img src="/images/security.png" alt="" width="40"/>
          </div>
              
          <div className="additional-feature-div-description">
            <h3>Payment Secure</h3>
            <p>Guaranteeing a secure payment process</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;