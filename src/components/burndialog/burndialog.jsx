import React, { Component } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import "./burndialog.scss";

class BurnDialog extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
      message: "",
    };

    this.handleClose = this.handleClose.bind(this);
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleMessageChange = (ev) => {
    this.setState({ message: ev.target.value });
  };

  handleOk = () => {
    const s = this.state;
    const p = this.props;
    p.burn(p.nft, s.message);
    this.setState({ open: false });
  };

  componentDidMount = () => {};

  render() {
    const s = this.state;
    const p = this.props;
    return (
      <div>
        <button className="cta-btn" onClick={this.handleClickOpen}>
          Burn
        </button>
        <SimpleDialog
          open={s.open}
          onClose={this.handleClose}
          onOk={this.handleOk}
          handleMessageChange={this.handleMessageChange}
        />
      </div>
    );
  }
}
export default BurnDialog;

class SimpleDialog extends Component {
  constructor(props) {
    super();
  }

  render() {
    const p = this.props;
    const s = this.state;
    return (
      <Dialog
        onClose={this.handleClose}
        open={p.open}
        id="dialog"
        fullWidth="true"
        maxWidth="md"
      >
        <DialogTitle className="dialog-title">Farewell Message</DialogTitle>

        <div className="content">
          <TextField
            id="message-input"
            label="Farewell Message(optional)"
            variant="standard"
            onChange={p.handleMessageChange}
          />
        </div>

        <div className="btn-container">
          <button href="#" className="cta-btn" onClick={() => this.handleOk()}>
            Burn
          </button>
        </div>
      </Dialog>
    );
  }
  handleClose = () => {
    const p = this.props;
    p.onClose();
  };
  handleOk = () => {
    const p = this.props;
    p.onOk();
  };
}
