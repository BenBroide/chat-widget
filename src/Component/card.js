import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import StarRate from "@material-ui/icons/StarRate";
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
    margin: "15px"
  }
});

const LocationMarker = ({ text }) => (
  <div>
    <HospitalIcon color="primary" />
    {text}
  </div>
);
class CenteredGrid extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = { showMap: false };
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

                    <Grid container>
                      <Grid item>
                        <StarRate color="secondary" />
                        <StarRate />
                        <StarRate />
                        <StarRate />
                        <StarRate />
                      </Grid>
                      <Grid item>
                        <Typography variant="caption" inline={true}>
                          Great Rating!
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid>
                      <Chip
                        avatar={
                          <Avatar>
                            <WalkIcon />
                          </Avatar>
                        }
                        label="Walking Distance"
                        className={this.props.classes.chip}
                      />
                      {/* <Chip
                        avatar={
                          <Avatar>
                            <DriveIcon />
                          </Avatar>
                        }
                        label="Driving Distance"
                        className={classes.chip}
                      /> */}
                      <Chip
                        avatar={
                          <Avatar>
                            <WatchIcon />
                          </Avatar>
                        }
                        label="Typically crowded in this time"
                        className={this.props.classes.chip}
                      />
                      {/* <Chip
                        avatar={
                          <Avatar>
                            <WatchIcon />
                          </Avatar>
                        }
                        label="Typically short wait in this time"
                        className={classes.chip}
                      /> */}
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
                style={{ width: "100%", height: "300px" }}
              >
                <Typography>Here is your direction:</Typography>
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
