import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Ratings from "./ratings";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

import WalkIcon from "@material-ui/icons/DirectionsWalk";
import DriveIcon from "@material-ui/icons/DirectionsCar";
import WatchIcon from "@material-ui/icons/WatchLater";
import HospitalIcon from "@material-ui/icons/LocalHospital";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: "left"
  },
  button: {
    margin: theme.spacing.unit
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  chip: {
    margin: "2px"
  },
  cardBg: {
    backgroundColor: "#f7f5f2",
    borderRadius: "20px",
    boxShadow: "5px 5px 5px #dbcece",
    margin: "15px",
    maxWidth: "100%",
    "- moz - transition": "all 0.3s",
    "-webkit - transition": "all 0.3s",
    transition: "all 0.3s"
  }
});

const LocationMarker = ({ text }) => (
  <div
    style={{
      width: "25px",
      borderRadius: "25px",
      background: "#fff",
      padding: "10px"
    }}
  >
    <HospitalIcon color="primary" />
    {/* {text} */}
  </div>
);

class CenteredGrid extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = { showMap: false };
  }

  getRatingText() {
    let rating = this.props.rating;
    let average = this.props.avgRating;
    let text = "";
    if (rating < average) {
      text = "Below Average";
    } else if (rating > average && rating < 0.7 * 5) {
      text = "Above Average";
    } else if (rating > 0.7 * 5 && rating < 0.9 * 5) {
      text = "Great Ratings!";
    } else if (rating > 0.9 * 5) {
      text = "pepole's Choice!";
    }
    return text;
  }

  getDistanceText() {
    let distance = this.props.distance;
    let roundedDistance = Math.round(distance * 100) / 100;
    let text = "";
    if (distance < 0.2) {
      text = `Walkable ${roundedDistance} mile`;
    } else if (distance > 0.2 && distance < 1) {
      text = `${roundedDistance} mile short drive`;
    } else if (distance > 1) {
      text = `${roundedDistance} mile drive`;
    }
    return text;
  }

  getDistanceIcon() {
    let distance = this.props.distance;
    if (distance < 1) {
      return <WalkIcon />;
    }
    return <DriveIcon />;
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Grid
          onClick={() => {
            this.setState({
              showMap: !this.state.showMap
            });
          }}
          style={{ cursor: "pointer" }}
          container
          spacing={24}
          justify="center"
        >
          <Grid item md={8} xs={12} className={this.props.classes.cardBg}>
            <Grid container spacing={16}>
              <Grid item>
                <ButtonBase className={this.props.classes.image}>
                  <img
                    className={this.props.classes.img}
                    alt="complex"
                    src="http://wowslider.com/sliders/demo-93/data1/images/sunset.jpg"
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant="caption" align="right">
                        Closing Time : {this.props.closingTime}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography gutterBottom variant="subheading">
                        {this.props.name}
                      </Typography>
                    </Grid>

                    <Grid container style={{ marginBottom: "5px" }}>
                      <Grid>
                        <Ratings
                          rating={this.props.rating}
                          widgetDimensions="25px"
                          widgetSpacings="3px"
                        >
                          <Ratings.Widget widgetRatedColor="blue" />
                          <Ratings.Widget widgetRatedColor="blue" />
                          <Ratings.Widget widgetRatedColor="blue" />
                          <Ratings.Widget widgetRatedColor="blue" />
                          <Ratings.Widget widgetRatedColor="blue" />
                        </Ratings>
                      </Grid>
                      <Grid item>
                        <Typography variant="caption" inline={true}>
                          {this.getRatingText()}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid>
                      <Chip
                        avatar={<Avatar>{this.getDistanceIcon()}</Avatar>}
                        label={this.getDistanceText()}
                        className={this.props.classes.chip}
                      />

                      <Chip
                        avatar={
                          <Avatar>
                            <WatchIcon />
                          </Avatar>
                        }
                        label="Typically crowded in this time"
                        className={this.props.classes.chip}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item md={12} justify="center">
              <ExpandMoreIcon fontSize="large" style={{ marginTop: "15px" }} />
            </Grid>
          </Grid>
        </Grid>
        {this.state.showMap && (
          <div>
            <Grid container spacing={24} justify="center">
              <Grid
                item
                md={8}
                xs={12}
                className={this.props.classes.cardBg}
                style={{ width: "100%", height: "320px" }}
              >
                <Typography style={{ padding: "10px" }}>
                  Here is your direction to <b>{this.props.name}</b>:
                </Typography>
                <div style={{ width: "100%", height: "25vh" }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyCfkZVfIFHmlQo5g9LTDw11k9NUgpyHVQk"
                    }}
                    defaultCenter={{
                      lat: this.props.lat,
                      lng: this.props.lng
                    }}
                    defaultZoom={13}
                  >
                    <LocationMarker
                      lat={this.props.lat}
                      lng={this.props.lng}
                      text={this.props.name}
                    />
                  </GoogleMapReact>
                </div>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CenteredGrid);
