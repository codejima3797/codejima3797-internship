import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Countdown } from "../../utils/Countdown";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ExploreItems = () => {
  const [exItems, setExItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchExItems();
  }, []);

  async function fetchExItems(filter) {
    setLoading(true);
    setTimeout(async () => {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      setExItems(data);
      setLoading(false);
    }, 1000);
  }

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);

    if (value === "price_low_to_high") {
      exItems.sort((a, b) => a.price - b.price);
    } else if (value === "price_high_to_low") {
      exItems.sort((a, b) => b.price - a.price);
    } else if (value === "likes_high_to_low") {
      exItems.sort((a, b) => b.likes - a.likes);
    }
  };

  const handleLoadMore = () => {
    setVisibleItems((prevVisible) => Math.min(prevVisible + 4, exItems.length));
  };

  const allItemsVisible = visibleItems >= exItems.length;

  return (
    <>
          <div>
            <select
              id="filter-items"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="">Default</option>
              <option value="price_low_to_high">Price, Low to High</option>
              <option value="price_high_to_low">Price, High to Low</option>
              <option value="likes_high_to_low">Most liked</option>
            </select>
          </div>

          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div
                key={index}
                  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton
                        circle
                        height={50}
                        width={50}
                        className="lazy"
                      />
                    </div>
                    <div className="de_countdown">
                      <Skeleton width={80} />
                    </div>
                    <div className="nft__item_wrap">
                      <Skeleton
                        className="lazy nft__item_preview"
                        height={200}
                        width="100%"
                      />
                    </div>
                    <div className="nft__item_info">
                      <Skeleton width={150} />
                      <div className="nft__item_price">
                        <Skeleton width={80} />
                      </div>
                      <div className="nft__item_like">
                        <Skeleton width={50} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : exItems
                .slice(0, visibleItems)
                .map(
                  ({
                    id,
                    authorId,
                    authorImage,
                    authorName,
                    expiryDate,
                    nftImage,
                    title,
                    price,
                    likes,
                  }) => (
                    <div
                    key={id}
                    className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    style={{ display: "block", backgroundSize: "cover" }}
                    >
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            >
                            <img
                              className="lazy"
                              src={authorImage}
                              alt={authorName}
                              />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <Countdown
                          className="de_countdown"
                          timestamp={expiryDate}
                          />
                        <div className="nft__item_wrap">
                          <Link to={`/item-details/${id}`}>
                            <img
                              src={nftImage}
                              className="lazy nft__item_preview explore__nft--img"
                              alt={title}
                              />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to={`/item-details/${id}`}>
                            <h4>{title}</h4>
                          </Link>
                          <div className="nft__item_price">{price} ETH</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
          {!loading && !allItemsVisible && (
            <div className="col-md-12 text-center">
              <button
                onClick={handleLoadMore}
                id="loadmore"
                className="btn-main lead"
              >
                Load more
              </button>
            </div>
          )}
    </>
  );
};

export default ExploreItems;
