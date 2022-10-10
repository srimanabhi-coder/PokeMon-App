import React, { useEffect, useState } from "react";
import "./Stats_Modal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import pokemonLogo from "../../img/pokemon-logo.png";
import pokeBall from "../../img/pokeball.png";
import ProgressBar from "../progress_bar/ProgressBar";

const Stats_Modal = (props) => {
  //   console.log(props.url_info);

  const [stats, setStats] = useState({
    name: "",
    height: "",
    weight: "",
    experience: 0,
    abilities: [],
    type1: "",
    type2: "",
    hp_name: "",
    hp_rank: 0,
    stat1_name: "",
    stat1_rank: 0,
    stat2_name: "",
    stat2_rank: 0,
    stat3_name: "",
    stat3_rank: 0,
    stat4_name: "",
    stat4_rank: 0,
  });

  useEffect(() => {
    async function getStats() {
      let resp = await fetch(props.url_info);
      let data = await resp.json();
      console.log(data);
      setStats({
        ...stats,
        name: data.name,
        height: data.height,
        weight: data.weight,

        experience: data.base_experience,
        abilities: data.abilities.map((val) => {
          return val.ability.name;
        }),

        type1: data.types[0].type.name,
        type2: data.types > 1 ? data.types[1].type.name : "",

        hp_name: data.stats[0].stat.name,
        hp_rank: data.stats[0].base_stat,

        stat1_name: data.stats[1].stat.name,
        stat1_rank: data.stats[1].base_stat,

        stat2_name: data.stats[2].stat.name,
        stat2_rank: data.stats[2].base_stat,

        stat3_name: data.stats[3].stat.name,
        stat3_rank: data.stats[3].base_stat,

        stat4_name: data.stats[4].stat.name,
        stat4_rank: data.stats[4].base_stat,
      });
    }
    getStats();
  }, [props.text_for_search]);

  console.log(stats);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div
          className="modal_wrapper"
          style={{ backgroundImage: props.card_bg_color_img }}
        >
          <img src={pokeBall} className="img-fluid pokeball_bg" alt="" />
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="modal-title"
            >
              <img
                src={pokemonLogo}
                className="img-fluid"
                width="280px"
                alt=""
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 pokemon_stats">
                  <div className="pokemon_details">
                    <h4 style={{ color: props.card_bg_color_img }}>
                      {stats.name}
                    </h4>
                    <div className="stats_list_wrapper">
                      <ul className="stats_list">
                        <li>
                          <ul className="stats_sublist">
                            <li className="stats_sublist_value">
                              {stats.height}
                            </li>
                            <li className="stats_sublist_propertie">Height</li>
                          </ul>
                        </li>
                        <li>
                          <ul className="stats_sublist">
                            <li className="stats_sublist_value">
                              {stats.weight}
                            </li>
                            <li className="stats_sublist_propertie">Weight</li>
                          </ul>
                        </li>
                      </ul>

                      <ul className="stats_list">
                        <li>
                          <ul className="stats_sublist">
                            <li className="stats_sublist_value">
                              {stats.experience} / 100
                            </li>
                            <li className="stats_sublist_propertie">
                              experience
                            </li>
                          </ul>
                        </li>
                        <li>
                          <ul className="stats_sublist">
                            <li className="stats_sublist_value">
                              {" "}
                              {stats.type1} / {stats.type2}
                            </li>
                            <li className="stats_sublist_propertie">Type</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="abilities">
                    <h4>Abilities</h4>
                    <ul>
                      {stats.abilities.map((val) => {
                        return <li>{val}</li>;
                      })}
                    </ul>
                  </div>

                  <div className="stats_with_rank">
                    <h4>Stats</h4>
                    <ul>
                      <li>
                        <span>{stats.stat1_name}</span> &nbsp;
                        <ProgressBar
                          width={`${stats.stat1_rank}%`}
                          backgroundColor="#495057"
                        />
                      </li>
                      <li>
                        <span>{stats.stat2_name}</span> &nbsp;
                        <ProgressBar
                          width={`${stats.stat2_rank}%`}
                          backgroundColor="#495057"
                        />
                      </li>
                      <li>
                        <span>{stats.stat3_name}</span> &nbsp;
                        <ProgressBar
                          width={`${stats.stat3_rank}%`}
                          backgroundColor="#495057"
                        />
                      </li>
                      <li>
                        <span>{stats.stat4_name}</span> &nbsp;
                        <ProgressBar
                          width={`${stats.stat4_rank}%`}
                          backgroundColor="#495057"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 img_section">
                  <img
                    src={props.pokemonImg}
                    className="img-fluid pokemonImg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer> */}
        </div>
      </Modal>
    </div>
  );
};

export default Stats_Modal;
