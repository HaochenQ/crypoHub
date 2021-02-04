import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2";
import http from "../service/httpService";
import { formatPrice, capitalize } from "../utils/helper";

const apiEndpoint = "/coins/";

/**
 * Coin details page contains coin's overview info and two charts
 */
const CoinDetails = (props) => {
  const [days, setDays] = useState(7);
  const [coinData, setCoinData] = useState();
  const { id } = useParams();
  //data from React router Link
  //current coin's general info
  const {
    Coin,
    MarketCap,
    Price,
    Volume_24h,
    Low_24h,
    High_24h,
  } = props.location.state;

  useEffect(() => {
    fetchData();
  }, [days]); // eslint-disable-line react-hooks/exhaustive-deps

  //fetch data
  const fetchData = async () => {
    const response = await http.get(apiEndpoint + id, {
      params: {
        days: days,
      },
    });
    const data = await response.data;
    setCoinData(data);
  };

  return (
    <div className="page">
      <Link to="/">
        <button className="back-home btn btn-secondary btn-sm">Go Back</button>
      </Link>
      {/* coin's overview section */}
      <section className="coin-overview">
        <h3>Overview</h3>
        <div className="coin-detail">
          <p className="coin-name">
            <img
              src={`${process.env.REACT_APP_IMAGE_URL + Coin}.png`}
              alt={Coin}
              height="25"
              style={{ marginRight: 10 }}
            />
            {capitalize(Coin)}
          </p>
          <p className="coin-info">
            <span>Market Cap: </span>
            {formatPrice(MarketCap)}
          </p>
          <p className="coin-info">
            <span>Price: </span>
            {formatPrice(Price)}
          </p>
          <p className="coin-info">
            <span>24 Hour Trading Vol: </span>
            {formatPrice(Volume_24h)}
          </p>
          <p className="coin-info">
            <span>24h Low / 24h High: </span>
            {formatPrice(Low_24h)}/ {formatPrice(High_24h)}
          </p>
        </div>
        <h3>Chart</h3>
      </section>
      {/* charts section contains price/market cap charts */}
      <section className="chart-section">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            className={
              days === 7
                ? "btn btn-secondary btn-sm"
                : "btn btn-outline-secondary btn-sm"
            }
            onClick={() => setDays(7)}
          >
            7d
          </button>
          <button
            type="button"
            className={
              days === 30
                ? "btn btn-secondary btn-sm"
                : "btn btn-outline-secondary btn-sm"
            }
            onClick={() => setDays(30)}
          >
            30d
          </button>
        </div>
        <div className="charts">
          {coinData && (
            <Line
              data={{
                labels: coinData.map((item) => item.Date.slice(0, 10)),
                datasets: [
                  {
                    label: `${Coin}`,
                    data: coinData.map((item) => item.MarketCap),
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                title: {
                  display: true,
                  text: `${capitalize(id)} Market Cap`,
                  fontSize: 20,
                },

                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: false,
                        callback: function (label, index, labels) {
                          return Intl.NumberFormat().format(label / 1e6) + " M";
                        },
                      },
                      scaleLabel: {
                        display: true,
                        labelString: `${capitalize(Coin)}/$`,
                      },
                    },
                  ],
                },
              }}
            />
          )}
          {coinData && (
            <Bar
              data={{
                labels: coinData.map((item) => item.Date.slice(0, 10)),
                datasets: [
                  {
                    label: `${Coin}`,
                    data: coinData.map((item) => item.Close),

                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255, 99, 132, 0.2)",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                title: {
                  display: true,
                  text: `${capitalize(id)} Price`,
                  fontSize: 20,
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: false,
                        callback: function (label, index, labels) {
                          return Intl.NumberFormat().format(label);
                        },
                      },
                      scaleLabel: {
                        display: true,
                        labelString: `${capitalize(Coin)}/$`,
                      },
                    },
                  ],
                },
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default CoinDetails;
