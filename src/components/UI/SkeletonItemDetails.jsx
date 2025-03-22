import Skeleton from "react-loading-skeleton";
import AuthorSection from "../item-details/AuthorSection";


const SkeletonItemDetails = () => (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <Skeleton className="img-fluid img-rounded mb-sm-30 nft-image" />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2><Skeleton /></h2>
                  <div className="item_info_counts">
                    {[1, 2].map(i => (
                      <div key={i} style={{ background: "none" }}>
                        <Skeleton
                          width={75}
                          height={30}
                          style={{ margin: i === 1 ? "0 -8px 0 0" : "0 0 0 -8px" }}
                        />
                      </div>
                    ))}
                  </div>
                  <p><Skeleton count={3} /></p>
                  <AuthorSection title={<Skeleton width={50} />} />
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <AuthorSection title={<Skeleton width={60} />} />
                    </div>
                    <div className="spacer-40"></div>
                    <Skeleton width={44} />
                    <div style={{ display: "flex" }}>
                      <Skeleton width={25} height={25} />
                      <span style={{ padding: "4px" }} />
                      <Skeleton width={60} height={25} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      </div>
);

export default SkeletonItemDetails