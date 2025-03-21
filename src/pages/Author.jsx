import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonExplore from "../components/UI/SkeletonExplore";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    if (authorId) {
      fetchAuthorData();
    }
  }, [authorId]);

  async function fetchAuthorData() {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setAuthorData(data);
    setFollowerCount(data.followers);

    setLoading(false);
  }

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount((prevCount) =>
      isFollowing ? prevCount - 1 : prevCount + 1
    );
  };

  if (loading) {
    return (
      <div className="no-bottom no-top" id="content">
        <section id="profile_banner" className="text-light">
          <Skeleton height={270} width="100%" />
        </section>
        <section style={{ padding: 0 }}>
          <div className="container">
            <div className="row">
              <div className="d_profile de-flex">
                <div className="de-flex-col">
                  <div className="profile_avatar">
                    <Skeleton circle height={150} width={150} />
                    <i className="fa fa-check"></i>
                    <div className="profile_name">
                      <h4 className="profile_header">
                        <Skeleton height={39} width={241} />
                        <span className="profile_username">
                          <Skeleton height={31} width={200} />
                        </span>
                        <span id="wallet" className="profile_wallet">
                          <Skeleton height={31} width={200} />
                        </span>
                        <button id="btn_copy" title="Copy Text">
                          <Skeleton height={14} width={31} />
                        </button>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="profile_follow de-flex">
                  <div className="de-flex-col">
                    <div className="profile_follower">
                      <Skeleton height={26} width={102} />
                    </div>
                    <Skeleton height={42} width={123} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row">
                <SkeletonExplore />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4 className="profile_header">
                          {authorData.authorName}
                          <span className="profile_username">
                            {authorData.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {authorData.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {followerCount} followers
                      </div>
                      <Link
                        to="#"
                        className={`btn-main ${isFollowing ? "followed" : ""}`}
                        onClick={handleFollowClick}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    authorId={authorId}
                    nftCollection={authorData.nftCollection}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
