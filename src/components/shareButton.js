import React, {Component, useRef} from "react";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faCopy, faDownload, faShare, faSpinner} from "@fortawesome/free-solid-svg-icons";
import ReactGA from "react-ga4";
import {FormControl, Modal, Overlay, Tooltip} from "react-bootstrap";

export default class ShareButton extends Component {
    state = {
        loading: false,
        showCopyNote: false,
    }

    constructor(props, context) {
        super(props, context);

        this.handleOnClick = this.handleOnClick.bind(this);
        this.showShareDialog = this.showShareDialog.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.copyText = this.copyText.bind(this);
        this.downloadImage = this.downloadImage.bind(this);
        this.trackGaEvent = this.trackGaEvent.bind(this);
    }

    render() {
        return (
            <>
                <Button className="share-button" variant="primary" onClick={this.handleOnClick}>
                    Teilen {this.state.loading ? <FontAwesomeIcon icon={faSpinner} spin/> :
                    <FontAwesomeIcon icon={faShare}/>}
                </Button>

                <Modal show={this.state.modalOpen} onHide={this.handleModalClose}>
                    <Modal.Header>
                        <Modal.Title>Sende das Bild an deine Freunde</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ol>
                            <li className="mb-3">
                                Lade das Bild herunter<br/>
                                <img src={this.props.previewImage} alt={this.props.altText}
                                     width="250"
                                     height="250"
                                     style={{width: '100px', height: '100px'}}/><br/>
                                <Button size="sm" className="mt-2" onClick={this.downloadImage}>
                                    {this.state.loading ?
                                        <FontAwesomeIcon
                                            icon={faSpinner}
                                            spin
                                            width="24"/> :
                                        <FontAwesomeIcon
                                            icon={faDownload}
                                            width="24"/>} Download
                                </Button>
                            </li>
                            <li className="mb-3">
                                Kopiere den Text
                                <FormControl
                                    as="textarea"
                                    value={this.generateSharingText()}
                                    readOnly/>

                                {navigator.clipboard &&
                                    <Button size="sm" className="mt-2" onClick={this.copyText}>
                                        <FontAwesomeIcon icon={this.state.showCopyNote ? faCheck : faCopy}
                                                         width="24"/> Kopieren
                                    </Button>}
                            </li>
                            <li>Teile das Bild auf einer Plattform deiner Wahl!</li>
                        </ol>
                    </Modal.Body>
                </Modal>
            </>
        )
    }

    handleOnClick(e) {
        const imageUrl = this.props.image;
        const title = this.props.title;
        const text = this.props.text;
        const id = this.props.id;

        if (!navigator.share) {
            this.showShareDialog();
            return;
        }

        if (this.detectOS() === 'Windows') {
            this.showShareDialog();
            return;
        }

        this.setState({
            loading: true,
        });

        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                this.setState({
                    loading: false,
                });

                const filesArray = [
                    new File(
                        [blob],
                        'startklar' + id + '.jpg',
                        {
                            type: "image/jpeg",
                            lastModified: new Date().getTime(),
                        }
                    )
                ];

                const shareData = {
                    files: filesArray,
                    url: "https://www.startklar.bayern",
                    text: this.generateSharingText(),
                }

                if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                    this.copyText();

                    navigator.share(shareData);

                    this.trackGaEvent('WebShareAPI');
                } else {
                    this.showShareDialog()
                }
            })

        console.log(imageUrl, text);
    }

    detectOS() {
        if (navigator.userAgentData) {
            return navigator.userAgentData.platform
        }

        let operatingSystem = 'Not known';
        if (window.navigator.appVersion.indexOf('Win') !== -1) {
            operatingSystem = 'Windows OS';
        }
        if (window.navigator.appVersion.indexOf('Mac') !== -1) {
            operatingSystem = 'MacOS';
        }
        if (window.navigator.appVersion.indexOf('X11') !== -1) {
            operatingSystem = 'UNIX OS';
        }
        if (window.navigator.appVersion.indexOf('Linux') !== -1) {
            operatingSystem = 'Linux OS';
        }

        return operatingSystem;
    }

    showShareDialog() {
        this.setState({
            modalOpen: true,
        });
    }

    handleModalClose() {
        this.setState({
            modalOpen: false
        });
    }

    generateSharingText() {
        return this.props.title + "\n\n" + this.props.text + "\n\nMehr Infos auf https://www.startklar.bayern"
    }

    copyText() {
        const text = this.generateSharingText();

        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
            this.setState({
                showCopyNote: true,
            });

            setTimeout(() => {
                this.setState({
                    showCopyNote: false,
                });
            }, 1000)
        }
    }

    downloadImage() {
        this.setState({
            loading: true,
        });

        fetch(this.props.image)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));

                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'startklar' + this.props.id + '.jpg')

                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);

                this.trackGaEvent('Manual');

                this.setState({
                    loading: false
                })
            })

    }

    trackGaEvent(shareType) {
        ReactGA.event({
            category: "share",
            action: "shareSharepic",
            label: this.props.id,
        });

        ReactGA.event({
            category: "share",
            action: "shareType",
            label: shareType,
        });
    }
}