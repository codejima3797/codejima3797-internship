import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/slick-arrows.css";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  function getCountdown(expiryTimestamp) {
    const now = Date.now();
    const timeLeft = expiryTimestamp - now;

    if (timeLeft <= 0) {
      return "";
    }

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  const useCountdown = (initialTimestamp) => {
    const [countdown, setCountdown] = useState("");
    const [hasTimeLeft, setHasTimeLeft] = useState(false);

    useEffect(() => {
      const updateCountdown = () => {
        const now = Date.now();
        const timeLeft = initialTimestamp - now;
        setHasTimeLeft(timeLeft > 0);
        setCountdown(getCountdown(initialTimestamp));
      };

      updateCountdown();

      const timer = setInterval(updateCountdown, 1000);
      return () => clearInterval(timer);
    }, [initialTimestamp]);

    return { countdown, hasTimeLeft };
  };

  const Countdown = ({ timestamp }) => {
    const { countdown, hasTimeLeft } = useCountdown(timestamp);
    return (
      <div className={`de_countdown ${hasTimeLeft ? "active" : ""}`}>
        {countdown}
      </div>
    );
  };

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setLoading(true);
    setTimeout(async () => {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setItems(data);
      setLoading(false);
    }, 1000);
  }

  function MultipleItems() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };

    return (
      <Slider ref={sliderRef} {...settings}>
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="nft__item--wrapper">
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton className="lazy" height={50} borderRadius={50} />
                  </div>
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <Skeleton />
                        </div>
                      </div>
                    </div>

                    <Skeleton
                      className="lazy nft__item img"
                      height={175}
                      width={225}
                    />
                  </div>
                  <div className="nft__item_info">
                    <Skeleton width={100} />
                    <Skeleton className="nft__item_price" width={50} />
                    <Skeleton className="nft__item_like" width={20} />
                  </div>
                </div>
              </div>
            ))
          : items.map((item) => (
              <div key={item.id} className="nft__item--wrapper">
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy nft__item--author-img"
                        src={item.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  <Countdown timestamp={item.expiryDate} />

                  <div className="nft__item_wrap">
                    <Link to={`/item-details/${item.id}`}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.id}`}>
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price}</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </Slider>
    );
  }

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider-container">
            {MultipleItems()}
            {loading ? (
              <>
                <Skeleton
                  className="slick-prev"
                  width={40}
                  height={40}
                  circle
                />
                <Skeleton
                  className="slick-next"
                  width={40}
                  height={40}
                  circle
                />
              </>
            ) : (
              <>
                <button
                  className="slick-prev"
                  onClick={() => sliderRef.current.slickPrev()}
                >
                  <i className="fa fa-chevron-left"></i>
                </button>
                <button
                  className="slick-next"
                  onClick={() => sliderRef.current.slickNext()}
                >
                  <i className="fa fa-chevron-right"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
