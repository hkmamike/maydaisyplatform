import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { firebaseAuth } from '../config/constants';
import { Link, Route } from 'react-router-dom';
import { FormGroup, FormControl, Grid, Row, Col, Button, Glyphicon, Modal, DropdownButton, MenuItem, HelpBlock } from 'react-bootstrap';
import { base } from '../config/constants';
import * as firebase from 'firebase';
import LocalizedStrings from 'react-localization';
import AvatarCropper from 'react-avatar-cropper';

let strings = new LocalizedStrings({
  en:{
    ordersDashboard1: 'Orders',
    ordersDashboard2: 'Dashboard',
    designs1: "Shop's",
    designs2: 'Designs',
    shopInformation1: 'Shop',
    shopInformation2: 'Information',
    allDesigns: 'All Designs',
    designsUpdate: 'Details & Update',

    buttonToShop: 'My Shop',
    buttonToAccount: 'My Account',

    deleteButton: 'Delete',
    deleteDesign: 'Delete Design',
    deleteText1: "To Proceed deleting this record, click the 'delete' button below",
    design: 'Design',
    price: 'Price',
    newDesign: 'New Design',

    backButton: 'Back',
    updateButton: 'Update',
    saveButton: 'Save',
    cancelButton: 'Close',

    createButton: 'Create',

    colorSettingsTitle: 'Color Type Setting',
    colorSettingsText1: 'This helps customers search for designs.',
    colorSettingsText2: 'Which of these frequently searched for colors does your design contain?',
    
    flowerSettingsTitle: 'Flower Type Setting',
    flowerSettingsText1: 'This helps customers search for designs.',
    flowerSettingsText2: 'Which of these frequently searched for flowers does your design contain?',

    noDesign: 'You do not have any design listed.',
    errorOccured: 'An error occured, please try again later.',
    designCreated: 'A new design has been created.',
    designUpdated: 'Design has been updated',
    errorIncomplete: 'Please complete all fields to create a new design',

    n: 'no',
    y: 'yes',

    designImage: 'Image:',
    designName: "Design's name:",
    designID: "Design's ID:",
    description: "Description:",
    color: 'Color:',
    flower: 'Flower:',

    designNameTip: "The new design's name should be at least 2 characters long.",
    designDescriptionTip: 'The description should be at least 20 characters long.',
    priceTip: 'Price should be an integer value greater or equal to 10.',

    settingButton: 'Setting',

    red: 'Red:',
    pink: 'Pink:',
    green: 'Green:',
    orange: 'Orange:',
    purple: 'Purple:',
    white: 'White:',
    yellow: 'Yellow:',
    lavender: 'Lavender:',
    blue: 'Blue:',

    dahlias: 'Dahlias:',
    delphinium: 'Delphinium:',
    daisies: 'Daisies:',
    hydrangeas: 'Hydrangeas:',
    iris: 'Iris:',
    orchids: 'Orchids:',
    peonies: 'Peonies:',
    roses: 'Roses:',
    sunFlowers: 'Sun Flowers:',
    tulips: 'Tulips:',
    carnations: 'Carnations:',
    deleteSuccess: 'Design has been removed from record.',

  },
  ch: {
    ordersDashboard1: ' ',
    ordersDashboard2: '定單列表',
    designs1: " ",
    designs2: '貨品列表',
    shopInformation1: ' ',
    shopInformation2: '店舖資料',
    allDesigns: '所有設計',
    designsUpdate: '詳情+更新',

    buttonToShop: '我的花店',
    buttonToAccount: '我的帳戶',

    deleteButton: '刪除',
    deleteDesign: '刪除設計',
    deleteText1: "如要繼續刪取這個地址，請按下'刪除'鈕扣。",
    design: '設計名稱',
    price: '價格',
    newDesign: '新增設計',

    backButton: '返回',
    updateButton: '更新',
    saveButton: '儲存',
    cancelButton: '關閉',

    createButton: '新增',

    colorSettingsTitle: '顏色類型設定',
    colorSettingsText1: '顏色類型設定可以幫客人更快的尋找適合的設計。',
    colorSettingsText2: '您新增的設計符合以下哪些顏色類型?',

    flowerSettingsTitle: '花種類型設定',
    flowerSettingsText1: '花種類型設定可以幫客人更快的尋找適合的設計。',
    flowerSettingsText2: '您新增的設計符合以下哪些花種類型?',
    
    noDesign: '您的商店目前並沒有貨品。',
    errorOccured: '系統錯誤，請稍後再試。',
    designCreated: '新設計已上架。',
    designUpdated: '設計已更新。',
    errorIncomplete: '資料不完整。請填寫所有設計資料。',

    n: 'no',
    y: 'yes',

    designImage: '設計照片:',
    designName: "設計名稱:",
    designID: "設計ID:",
    description: "設計描述:",
    color: '顏色:',
    flower: '花種:',
    
    designNameTip: "新設計的名稱最短應為兩個字。",
    designDescriptionTip: '描述最短應為二十個字。',
    priceTip: '價格應為最少是十的整數。',

    settingButton: '設定',

    red: '紅色:',
    pink: '粉紅色:',
    green: '綠色:',
    orange: '橙色:',
    purple: '紫色:',
    white: '白色:',
    yellow: '黃色:',
    lavender: '薰衣草色:',
    blue: '藍色:',

    dahlias: '大麗花:',
    delphinium: '翠雀:',
    daisies: '菊花:',
    hydrangeas: '繡球:',
    iris: '鳶尾花:',
    orchids: '蘭花:',
    peonies: '牡丹:',
    roses: '玫瑰:',
    sunFlowers: '太陽花:',
    tulips: '鬱金香:',
    carnations: '康乃馨:',
    deleteSuccess: '設計已刪除。',

  }
});

const ButtonToShop = ({ title, history }) => (
  <Button bsStyle="" className="head-button-teal" onClick={() => history.push('/ordersdashboard')}>{strings.buttonToShop}</Button>
);

const ButtonToAccount = ({ title, history }) => (
  <Button bsStyle="" className="head-button-white" onClick={() => history.push('/orderhistory')}>{strings.buttonToAccount}</Button>
);

class DeleteDesignModal extends React.Component {
  constructor() {
    super();
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.deleteDesign = this.deleteDesign.bind(this);
    this.state = {
      showModal: false
    }
  }

  close() {
    this.setState({showModal: false});
  }
  open() {
    this.setState({showModal: true});
  }
  deleteDesign() {
    this.props.onDeleteDesign();
    this.close();
  }
  render() {
    return (
      <div>
        <Button bsStyle="" className="design-delete-button" onClick={this.open}>{strings.deleteButton}</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title><strong>{strings.deleteDesign}</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{strings.deleteText1}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="" className="button button-back" onClick={this.close}>{strings.cancelButton}</Button>
            <Button bsStyle="" className="button" onClick={this.deleteDesign}>{strings.deleteButton}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

class ColorType extends React.Component {
  constructor() {
    super();
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.state = {
      showModal: false,
      blue: 'n',
      green: 'n',
      lavender: 'n',
      orange: 'n',
      pink: 'n',
      purple: 'n',
      red: 'n',
      white: 'n',
      yellow: 'n'
    }
  }

  fetchData = () => {
    if (this.props.selectedDesign === null) {
      this.setState({
        blue: 'n',
        green: 'n',
        lavender: 'n',
        orange: 'n',
        pink: 'n',
        purple: 'n',
        red: 'n',
        white: 'n',
        yellow: 'n'
      });
    } else {
      base.fetch(`arrangementsList/${this.props.selectedDesign}/color`, {
        context: this,
        then(data) {
            var blue = 'n';
            var green = 'n';
            var lavender = 'n';
            var orange = 'n';
            var pink = 'n';
            var purple= 'n';
            var red = 'n';
            var white = 'n';
            var yellow = 'n';

            if (data.length > 0) {
              if (data.indexOf('blue')> -1) {
                blue='y'
              }
              if (data.indexOf('green')> -1) {
                green='y'
              }
              if (data.indexOf('lavender')> -1) {
                lavender='y'
              }
              if (data.indexOf('orange')> -1) {
                orange='y'
              }
              if (data.indexOf('pink')> -1) {
                pink='y'
              }
              if (data.indexOf('purple')> -1) {
                purple='y'
              }
              if (data.indexOf('red')> -1) {
                red='y'
              }
              if (data.indexOf('white')> -1) {
                white='y'
              }
              if (data.indexOf('yellow')> -1) {
                yellow='y'
              }
            }
            this.setState({
                blue: blue,
                green: green,
                lavender: lavender,
                orange: orange,
                pink: pink,
                purple: purple,
                red: red,
                white: white,
                yellow: yellow
            });
          }
        }); 
    }
  }
  
  close() {
    this.setState({showModal: false});
    //force states to update since it does not dismount on close. It cases content to flash if placed on open()
    this.fetchData();
  }
  open() {
    this.setState({showModal: true});
  }
  handleSettingChange = (color, eventKey) => {
    switch (color) {
      case 'blue': 
        this.setState({blue: eventKey});
        break
      case 'green': 
        this.setState({green: eventKey});
        break
      case 'lavender': 
        this.setState({lavender: eventKey});
        break
      case 'orange': 
        this.setState({orange: eventKey});
        break
      case 'pink': 
        this.setState({pink: eventKey});
        break
      case 'purple': 
        this.setState({purple: eventKey});
        break
      case 'red': 
        this.setState({red: eventKey});
        break
      case 'white': 
        this.setState({white: eventKey});
        break
      case 'yellow': 
        this.setState({yellow: eventKey});
        break
    }
  }
  componentWillMount () {
    this.fetchData();
  }

  handleColorUpdate = () => {
    var colorsArray = [];

    if (this.state.blue === 'y') {
      colorsArray.push('blue');
    }
    if (this.state.green === 'y') {
      colorsArray.push('green');
    }
    if (this.state.lavender === 'y') {
      colorsArray.push('lavender');
    }
    if (this.state.orange === 'y') {
      colorsArray.push('orange');
    }
    if (this.state.pink === 'y') {
      colorsArray.push('pink');
    }
    if (this.state.purple === 'y') {
      colorsArray.push('purple');
    }
    if (this.state.red === 'y') {
      colorsArray.push('red');
    }
    if (this.state.white === 'y') {
      colorsArray.push('white');
    }
    if (this.state.yellow === 'y') {
      colorsArray.push('yellow');
    }

    if (this.props.selectedDesign === null) {
      this.props.onCreateDesignColorUpdate(colorsArray);
      this.close();
    } else {
      base.post(`arrangementsList/${this.props.selectedDesign}/color`, {
        data: colorsArray
      }).then(() => 
        this.close()
      ).catch(err => {
        console.log("An error occured when updating design's color.");
      });
    }
  }

  render() {
      return (
          <div>
              <Button bsStyle="" className="setting-button" onClick={this.open}>{strings.settingButton}</Button>
              <Modal show={this.state.showModal} onHide={this.close}>

                  <div>
                      <Modal.Header closeButton>
                      <Modal.Title><strong>{strings.colorSettingsTitle}</strong></Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <h4>{strings.colorSettingsText1}</h4>
                          <p>{strings.colorSettingsText2}</p>
                          <Grid>
                            <div className="sub-list-item">
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={5}>
                                    {strings.blue}
                                  </Col>
                                  <Col sm={5}>
                                    <DropdownButton title={strings[this.state.blue]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange('blue',eventKey)}>
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={5}>
                                  {strings.green}
                                  </Col>
                                  <Col sm={5}>
                                    <DropdownButton title={strings[this.state.green]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange('green',eventKey)}>
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={5}>
                                  {strings.lavender}
                                  </Col>
                                  <Col sm={5}>
                                    <DropdownButton title={strings[this.state.lavender]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange('lavender',eventKey)}>
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={5}>
                                  {strings.orange}
                                  </Col>
                                  <Col sm={5}>
                                    <DropdownButton title={strings[this.state.orange]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange('orange',eventKey)}>
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={5}>
                                  {strings.pink}
                                  </Col>
                                  <Col sm={5}>
                                    <DropdownButton title={strings[this.state.pink]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange('pink',eventKey)}>
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={5}>
                                  {strings.purple}
                                  </Col>
                                  <Col sm={5}>
                                    <DropdownButton title={strings[this.state.purple]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange('purple',eventKey)}>
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={5}>
                                  {strings.red}
                                  </Col>
                                  <Col sm={5}>
                                    <DropdownButton title={strings[this.state.red]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange('red',eventKey)}>
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={5}>
                                  {strings.white}
                                  </Col>
                                  <Col sm={5}>
                                    <DropdownButton title={strings[this.state.white]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange('white',eventKey)}>
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={5}>
                                  {strings.yellow}
                                  </Col>
                                  <Col sm={5}>
                                    <DropdownButton title={strings[this.state.yellow]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange('yellow',eventKey)}>
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                            </div>
                          </Grid>
                      </Modal.Body>
                  </div>
                  <Modal.Footer>
                  <Button bsStyle="" className="button button-back" onClick={this.close}>{strings.backButton}</Button>
                  <Button bsStyle="" className="button" onClick={this.handleColorUpdate}>{strings.saveButton}</Button>
                  </Modal.Footer>
              </Modal>
          </div>
      )
  }
}

class FlowerType extends React.Component {
  constructor() {
    super();
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.state = {
      showModal: false,
      dahlias: 'n',
      delphinium: 'n',
      daisies: 'n',
      hydrangeas: 'n',
      iris: 'n',
      orchids: 'n',
      peonies: 'n',
      roses: 'n',
      sunflowers: 'n',
      tulips: 'n',
      carnations: 'n'
    }
  }

  fetchData = () => {

    if (this.props.selectedDesign === null) {
      this.setState({
        dahlias: 'n',
        delphinium: 'n',
        daisies: 'n',
        hydrangeas: 'n',
        iris: 'n',
        orchids: 'n',
        peonies: 'n',
        roses: 'n',
        sunflowers: 'n',
        tulips: 'n',
        carnations: 'n'
      });
    } else {
      base.fetch(`arrangementsList/${this.props.selectedDesign}/flower`, {
        context: this,
        then(data) {
            var dahlias = 'n';
            var delphinium = 'n';
            var daisies = 'n';
            var hydrangeas = 'n';
            var iris = 'n';
            var orchids= 'n';
            var peonies = 'n';
            var roses = 'n';
            var sunflowers = 'n';
            var tulips = 'n';
            var carnations = 'n';

            if (data.length > 0) {
              if (data.indexOf('dahlias')> -1) {
                dahlias='y'
              }
              if (data.indexOf('delphinium')> -1) {
                delphinium='y'
              }
              if (data.indexOf('daisies')> -1) {
                daisies='y'
              }
              if (data.indexOf('hydrangeas')> -1) {
                hydrangeas='y'
              }
              if (data.indexOf('iris')> -1) {
                iris='y'
              }
              if (data.indexOf('orchids')> -1) {
                orchids='y'
              }
              if (data.indexOf('peonies')> -1) {
                peonies='y'
              }
              if (data.indexOf('roses')> -1) {
                roses='y'
              }
              if (data.indexOf('sunflowers')> -1) {
                sunflowers='y'
              }
              if (data.indexOf('tulips')> -1) {
                tulips='y'
              }
              if (data.indexOf('carnations')> -1) {
                carnations='y'
              }
            }

            this.setState({
                dahlias: dahlias,
                delphinium: delphinium,
                daisies: daisies,
                hydrangeas: hydrangeas,
                iris: iris,
                orchids: orchids,
                peonies: peonies,
                roses: roses,
                sunflowers: sunflowers,
                tulips: tulips,
                carnations: carnations
            });
        }
      });
    }
  }
  
  close() {
    this.setState({showModal: false});
    //force states to update since it does not dismount on close. It cases content to flash if placed on open()
    this.fetchData();
  }
  open() {
    this.setState({showModal: true});
  }
  handleSettingChange = (flower, eventKey) => {
    switch (flower) {
      case 'dahlias': 
        this.setState({dahlias: eventKey});
        break
      case 'delphinium': 
        this.setState({delphinium: eventKey});
        break
      case 'daisies': 
        this.setState({daisies: eventKey});
        break
      case 'hydrangeas': 
        this.setState({hydrangeas: eventKey});
        break
      case 'iris': 
        this.setState({iris: eventKey});
        break
      case 'orchids': 
        this.setState({orchids: eventKey});
        break
      case 'peonies': 
        this.setState({peonies: eventKey});
        break
      case 'roses': 
        this.setState({roses: eventKey});
        break
      case 'sunflowers': 
        this.setState({sunflowers: eventKey});
        break
      case 'tulips': 
        this.setState({tulips: eventKey});
        break
      case 'carnations': 
        this.setState({carnations: eventKey});
        break
    }
  }
  componentWillMount () {
    this.fetchData();
  }

  handleFlowerUpdate = () => {
    var flowersArray = [];
    if (this.state.dahlias === 'y') {
      flowersArray.push('dahlias');
    }
    if (this.state.delphinium === 'y') {
      flowersArray.push('delphinium');
    }
    if (this.state.daisies === 'y') {
      flowersArray.push('daisies');
    }
    if (this.state.hydrangeas === 'y') {
      flowersArray.push('hydrangeas');
    }
    if (this.state.iris === 'y') {
      flowersArray.push('iris');
    }
    if (this.state.orchids === 'y') {
      flowersArray.push('orchids');
    }
    if (this.state.peonies === 'y') {
      flowersArray.push('peonies');
    }
    if (this.state.roses === 'y') {
      flowersArray.push('roses');
    }
    if (this.state.sunflowers === 'y') {
      flowersArray.push('sunflowers');
    }
    if (this.state.tulips === 'y') {
      flowersArray.push('tulips');
    }
    if (this.state.carnations === 'y') {
      flowersArray.push('carnations');
    }

    if (this.props.selectedDesign === null) {
      this.props.onCreateDesignFlowerUpdate(flowersArray);
      this.close();
    } else {
      base.post(`arrangementsList/${this.props.selectedDesign}/flower`, {
        data: flowersArray
      }).then(() => 
        this.close()
      ).catch(err => {
        console.log("An error occured when updating design's flower type.");
      });
    }
  }

  render() {
      return (
          <div>
              <Button bsStyle="" className="setting-button" onClick={this.open}>{strings.settingButton}</Button>
              <Modal show={this.state.showModal} onHide={this.close}>

                  <div>
                      <Modal.Header closeButton>
                      <Modal.Title><strong>{strings.flowerSettingsTitle}</strong></Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <p>{strings.flowerSettingsText1}</p>
                          <p>{strings.flowerSettingsText2}</p>
                          <Grid>
                            <div className="sub-list-item">
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={5}>
                                    {strings.dahlias}
                                  </Col>
                                  <Col sm={5}>
                                    <DropdownButton 
                                      title={strings[this.state.dahlias]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('dahlias',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={5}>
                                    {strings.delphinium}
                                  </Col>
                                  <Col sm={5}>
                                    <DropdownButton 
                                      title={strings[this.state.delphinium]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('delphinium',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={5}>
                                    {strings.daisies}
                                  </Col>
                                  <Col sm={5}>
                                    <DropdownButton 
                                      title={strings[this.state.daisies]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('daisies',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={5}>
                                    {strings.hydrangeas}
                                  </Col>
                                  <Col sm={5}>
                                    <DropdownButton 
                                      title={strings[this.state.hydrangeas]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('hydrangeas',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={5}>
                                    {strings.iris}
                                  </Col>
                                  <Col sm={5}>
                                    <DropdownButton 
                                      title={strings[this.state.iris]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('iris',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={5}>
                                    {strings.orchids}
                                  </Col>
                                  <Col sm={5}>
                                    <DropdownButton 
                                      title={strings[this.state.orchids]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('orchids',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={5}>
                                    {strings.peonies}
                                  </Col>
                                  <Col sm={5}>
                                    <DropdownButton 
                                      title={strings[this.state.peonies]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('peonies',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={5}>
                                    {strings.roses}
                                  </Col>
                                  <Col sm={5}>
                                    <DropdownButton 
                                      title={strings[this.state.roses]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('roses',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={5}>
                                    {strings.sunFlowers}
                                  </Col>
                                  <Col sm={5}>
                                    <DropdownButton 
                                      title={strings[this.state.sunflowers]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('sunflowers',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={5}>
                                    {strings.tulips}
                                  </Col>
                                  <Col sm={5}>
                                    <DropdownButton 
                                      title={strings[this.state.tulips]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('tulips',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={5}>
                                    {strings.carnations}
                                  </Col>
                                  <Col sm={5}>
                                    <DropdownButton 
                                      title={strings[this.state.carnations]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('carnations',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                            </div>
                          </Grid>
                      </Modal.Body>
                  </div>
                  <Modal.Footer>
                  <Button bsStyle="" className="button button-back" onClick={this.close}>{strings.backButton}</Button>
                  <Button bsStyle="" className="button button-back" onClick={this.handleFlowerUpdate}>{strings.updateButton}</Button>
                  </Modal.Footer>
              </Modal>
          </div>
      )
  }
}

class FileUpload extends React.Component {
    handleFile = (e) => {
        var reader = new FileReader();
        var file = e.target.files[0];
    
        if (!file) return;
    
        reader.onload = function(img) {
          ReactDOM.findDOMNode(this.refs.in).value = '';
          this.props.handleFileChange(img.target.result);
        }.bind(this);
        reader.readAsDataURL(file);
    }
    
    render() {
        return (
            <input ref="in" type="file" accept="image/*" onChange={this.handleFile} />
        );
    }
}

class DesignDetails extends React.Component {
  constructor() {
      super();
      this.state = {
          loading: true,
          designDetails: {},
          cropperOpen: false,
          img: null,
          newImageFlag: false,
      }
  }

  componentWillMount () {
      this.fireBaseListenerForDesignDetails = firebaseAuth().onAuthStateChanged((user) => {
          base.fetch(`arrangementsList/${this.props.selectedDesign}`, {
              context: this,
              then(data) {
                  this.setState({
                      designDetails: data, 
                      loading: false, 
                      name: data.name, 
                      price: data.price, 
                      description: data.description, 
                      color: data.color, 
                      flower: data.flower,
                      croppedImg: data.image
                  });
              }
          });
      });
  }

  componentWillUnmount () {
      //returns the unsubscribe function
      this.fireBaseListenerForDesignDetails && this.fireBaseListenerForDesignDetails();
      this.fireBaseListenerForDeleteDesign && this.fireBaseListenerForDeleteDesign();
  }

  handleBack = () => {
      this.props.onHandleBack();
  }

  handleDesignUpdate = (name, price, description, color, flower, croppedImg, newImageFlag) => {
      this.props.onHandleDesignUpdate(this.props.selectedDesign, name, price, description, color, flower, croppedImg, newImageFlag);
  }

  handleNameChange = (e) => {
      this.setState({ name: e.target.value });
  }
  handlePriceChange = (e) => {
      this.setState({ price: e.target.value });
  }
  handleDescriptionChange = (e) => {
      this.setState({ description: e.target.value });
  }
  handleFileChange = (dataURL) => {
      this.setState({
          img: dataURL,
          croppedImg: this.state.croppedImg,
          cropperOpen: true
        });
  }
  handleCrop = (dataURL) => {
      this.setState({
          cropperOpen: false,
          img: null,
          croppedImg: dataURL,
          newImageFlag: true
        });
  }
  handleRequestHide = () => {
      this.setState({
          cropperOpen: false
        });
  }
  handleDelete = () => {
    console.log('designerCode:', this.props.designerCode);
    console.log('design ID:', this.state.designDetails.id);
    base.remove(`florists/${this.props.designerCode}/arrangements/${this.state.designDetails.id}`).then(() => {
        base.remove(`arrangementsList/${this.state.designDetails.id}`);
        this.props.onDesignDeleteSuccess();
    }).catch(error => {
        //handle error
        console.log('an error occured when deleting record.');
    });
}

  render() {
    var designDetails = this.state.designDetails;
    var loadingState = this.state.loading;
    var name = this.state.name;
    var price = this.state.price;
    var color = this.state.color;
    var flower = this.state.flower;
    var description = this.state.description;
    var croppedImg = this.state.croppedImg;
    var newImageFlag = this.state.newImageFlag;
    let content = null;

    if (loadingState) {
      content = <div className="loader"></div>
    } else {
      content = (
        <div>
          <Grid>
            { this.props.infoMessage &&
              <div className="alert alert-success update-message" role="alert">
                <Glyphicon glyph="exclamation-sign" className="icons"/>&nbsp;{this.props.infoMessage} 
              </div>
            }
            { this.props.errorMessage &&
              <div className="alert alert-danger update-message" role="alert">
                <Glyphicon glyph="exclamation-sign" className="icons"/>&nbsp;{this.props.errorMessage} 
              </div>
            }
            <div className="design-details">
                <Row className="show-grid">
                    <FormGroup>
                    <Col sm={1} md={2}></Col>
                    <Col sm={3} md={2}>
                        <div><strong>{strings.designImage}</strong></div>
                    </Col>
                    <Col sm={8} md={5}>
                    <div>
                        <div className="avatar-photo">
                            <FileUpload handleFileChange={this.handleFileChange} />
                            <div className="avatar-edit">
                                <i className="fa fa-camera"></i>
                            </div>
                            {this.state.croppedImg && <img className="design-detail-arrangement-pic" alt="" src={this.state.croppedImg} />}
                        </div>
                        {this.state.cropperOpen &&
                        <AvatarCropper
                            onRequestHide={this.handleRequestHide}
                            cropperOpen={this.state.cropperOpen}
                            onCrop={this.handleCrop}
                            image={this.state.img}
                            width={400}
                            height={400}
                        />
                        }
                    </div>
                    </Col>
                  </FormGroup>
                </Row>
                <Row className="show-grid">
                    <FormGroup>
                    <Col sm={1} md={2}></Col>
                    <Col sm={3} md={2}>
                        <div><strong>{strings.designName}</strong></div>
                    </Col>
                    <Col sm={5} md={5}>
                      <FormControl className="data-field-update" type="text" value={name} onChange={this.handleNameChange}/>
                    </Col>
                    <Col sm={3} md={2}>
                      <DeleteDesignModal
                        onDeleteDesign={this.handleDelete}
                      />
                    </Col>
                    </FormGroup>
                </Row>
                <Row className="show-grid">
                    <FormGroup>
                    <Col sm={1} md={2}></Col>
                    <Col sm={3} md={2}>
                        <div><strong>{strings.designID}</strong></div>
                    </Col>
                    <Col sm={8}  md={5}>
                        <div>{designDetails.id}</div>
                    </Col>
                    </FormGroup>
                </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
                      <div><strong>{strings.price} ({designDetails.currency}):</strong></div>
                  </Col>
                  <Col sm={8} md={5}>
                    <FormControl className="data-field-update" type="text" value={price} onChange={this.handlePriceChange}/>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
                      <div><strong>{strings.description}</strong></div>
                  </Col>
                  <Col sm={8} md={5}>
                    <FormControl className="card-text-area data-field-update" componentClass="textarea" value={description} onChange={this.handleDescriptionChange}/>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
                      <div><strong>{strings.color}</strong></div>
                  </Col>
                  <Col sm={8} md={5}>
                    <ColorType
                        selectedDesign={this.props.selectedDesign}
                        designerCode={this.props.designerCode}
                    />
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
                      <div><strong>{strings.flower}</strong></div>
                  </Col>
                  <Col sm={8} md={5}>
                    <FlowerType
                        selectedDesign={this.props.selectedDesign}
                        designerCode={this.props.designerCode}
                    />
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={5}>
                  </Col>
                  <Col sm={4}>
                    <Button bsStyle="" className="button button-back" onClick={() => this.handleBack()}>{strings.backButton}</Button>
                    <Button bsStyle="" className="button button-update" onClick={() => this.handleDesignUpdate(name, price, description, color, flower, croppedImg, newImageFlag)}>{strings.updateButton}</Button>
                  </Col>
                </FormGroup>
              </Row>
            </div>
          </Grid>
        </div>
      )
    }
    return (
      <div>
        {content}
      </div>
    )
  }
}

class NewDesign extends React.Component {
  constructor() {
      super();
      this.state = {
          loading: true,
          designDetails: {},
          cropperOpen: false,
          img: null,
          name: '',
          price: '',
          description: '',
          croppedImg: null,
          colorsArray: [],
          flowersArray: [],
      }
  }

  componentWillMount () {
    this.setState({
        loading: false
    });
  }

  componentWillUnmount () {
    console.log('unmounting tasks');
  }

  handleBack = () => {
      this.props.onHandleBack();
  }

  handleNewDesign = (name, price, description, colorsArray, flowersArray, croppedImg) => {
      if (this.validateName() ==='success' && this.validatePrice() ==='success' && this.validateDescription() ==='success' && this.validatePic() ==='success') {
        this.props.onHandleNewDesign(name, price, description, colorsArray, flowersArray, croppedImg);
      } else {
        this.props.onNewDesignIncomplete();
      }
  }

  handleNameChange = (e) => {
      this.setState({ name: e.target.value });
  }
  handlePriceChange = (e) => {
      this.setState({ price: e.target.value });
  }
  handleDescriptionChange = (e) => {
      this.setState({ description: e.target.value });
  }
  handleFileChange = (dataURL) => {
      this.setState({
          img: dataURL,
          croppedImg: this.state.croppedImg,
          cropperOpen: true
        });
  }
  handleCrop = (dataURL) => {
      this.setState({
          cropperOpen: false,
          img: null,
          croppedImg: dataURL
        });
  }
  handleRequestHide = () => {
      this.setState({
          cropperOpen: false
        });
  }
  handleCreateDesignColorUpdate = (colorsArray) => {
    this.setState({colorsArray: colorsArray});
  }
  handleCreateDesignFlowerUpdate = (flowersArray) => {
    this.setState({flowersArray: flowersArray});
  }
  validatePic = () => {
    var pic = this.state.croppedImg;
    if (pic===null) {
      return 'warning'
    } else if (pic!==null) {
      return 'success'
    } else {
      return null;
    }
  }
  validateName = () => {
    const length = this.state.name.length;
    if (length > 2){
      return 'success';
    }  else if (length > 0) {
      return 'warning';
    } else {
      return null;
    }
  }
  validateDescription = () => {
    const length = this.state.description.length;
    if (length > 20){
      return 'success';
    }  else if (length > 0) {
      return 'warning';
    } else {
      return null;
    }
  }
  validatePrice = () => {
    const length = this.state.price.length;
    const price = this.state.price;
    const priceInt = parseInt(price);
    var positive = false;
    var integer = false;

    if (priceInt >= 10) {
      positive = true;
    }
    if (!(price.indexOf('.') >= 0)) {
      integer = true;
    }

    if (positive && integer){
      return 'success';
    } else if (length > 0) {
      return 'error';
    } else {
      return null;
    }
  }
  render() {
    var loadingState = this.state.loading;
    var name = this.state.name;
    var price = this.state.price;
    var description = this.state.description;
    var croppedImg = this.state.croppedImg;
    var colorsArray = this.state.colorsArray;
    var flowersArray = this.state.flowersArray;
    let content = null;

    if (loadingState) {
      content = <div className="loader"></div>
    } else {
      content = (
        <div>
          <Grid>
            { this.props.infoMessage &&
              <div className="alert alert-success update-message" role="alert">
                <Glyphicon glyph="exclamation-sign" className="icons"/>&nbsp;{this.props.infoMessage} 
              </div>
            }
            { this.props.errorMessage &&
              <div className="alert alert-danger update-message" role="alert">
                <Glyphicon glyph="exclamation-sign" className="icons"/>&nbsp;{this.props.errorMessage} 
              </div>
            }
            <div className="design-details">
                <Row className="show-grid">
                    <FormGroup>
                    <Col sm={1} md={2}></Col>
                    <Col sm={3} md={2}>
                        <div><strong>{strings.designImage}</strong></div>
                    </Col>
                    <Col sm={8}>
                    <div>
                        <div className="avatar-photo">
                            <FileUpload handleFileChange={this.handleFileChange} />
                            <div className="avatar-edit">
                                <i className="fa fa-camera"></i>
                            </div>
                            <img className="design-detail-arrangement-pic" alt="" src={this.state.croppedImg} />
                        </div>
                        {this.state.cropperOpen &&
                        <AvatarCropper
                            onRequestHide={this.handleRequestHide}
                            cropperOpen={this.state.cropperOpen}
                            onCrop={this.handleCrop}
                            image={this.state.img}
                            width={400}
                            height={400}
                        />
                        }
                    </div>
                    </Col>
                  </FormGroup>
                </Row>
                <Row className="show-grid">
                    <FormGroup>
                    <Col sm={1} md={2}></Col>
                    <Col sm={3} md={2}>
                        <div><strong>{strings.designName}</strong></div>
                    </Col>
                    <Col sm={8} md={5}>
                        <FormGroup
                          validationState={this.validateName()}
                        >
                          <FormControl className="data-field-update" type="text" value={name} onChange={this.handleNameChange}/>
                          <FormControl.Feedback/>
                          <HelpBlock>{strings.designNameTip}</HelpBlock>
                        </FormGroup>
                    </Col>
                    </FormGroup>
                </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
                      <div><strong>{strings.designDescription}</strong></div>
                  </Col>
                  <Col sm={8} md={5}>
                    <FormGroup
                      validationState={this.validateDescription()}
                    >
                      <FormControl className="card-text-area data-field-update" componentClass="textarea" value={description} onChange={this.handleDescriptionChange}/>
                      <FormControl.Feedback/>
                      <HelpBlock>{strings.designDescriptionTip}</HelpBlock>
                    </FormGroup>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
                      <div><strong>{strings.price}</strong></div>
                  </Col>
                  <Col sm={8} md={5}>
                    <FormGroup
                      validationState={this.validatePrice()}
                    >
                      <FormControl className="data-field-update" type="text" value={price} onChange={this.handlePriceChange}/>
                      <FormControl.Feedback/>
                      <HelpBlock>{strings.priceTip}</HelpBlock>
                    </FormGroup>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
                      <div><strong>{strings.color}</strong></div>
                  </Col>
                  <Col sm={8} md={5}>
                    <ColorType
                        onCreateDesignColorUpdate = {this.handleCreateDesignColorUpdate}
                        selectedDesign={null}
                        designerCode={this.props.designerCode}
                    />
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
                      <div><strong>{strings.flower}</strong></div>
                  </Col>
                  <Col sm={8} md={5}>
                    <FlowerType
                        onCreateDesignFlowerUpdate = {this.handleCreateDesignFlowerUpdate}
                        selectedDesign={null}
                        designerCode={this.props.designerCode}
                    />
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={5}>
                  </Col>
                  <Col sm={4}>
                    <Button bsStyle="" className="button sub-details-back" onClick={() => this.handleBack()}>{strings.backButton}</Button>
                    <Button bsStyle="" className="button sub-details-update" onClick={() => this.handleNewDesign(name, price, description, colorsArray, flowersArray, croppedImg)}>{strings.createButton}</Button>
                  </Col>
                </FormGroup>
              </Row>
            </div>
          </Grid>
        </div>
      )
    }
    return (
      <div>
        {content}
      </div>
    )
  }
}

export default class Designs extends Component {
  constructor() {
    super();
    this.handleChooseDesign = this.handleChooseDesign.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.state = {
      designsData: {},
      loading: true,
      designsDetailsStatus: 0,
      selectedDesign: '',
      infoMessage: null,
      errorMessage: null,
      newImage: false
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.languageChanged==='ch') {
      strings.setLanguage('ch');
    } else if (nextProps.languageChanged==='en') {
      strings.setLanguage('en');
    }
  }
  componentWillMount() {
    var designer = this.props.designerCode;
    var thisRef = this;
    strings.setLanguage(this.props.languageChanged);
    if (designer) {
      this.fireBaseListenerForDesigns = firebaseAuth().onAuthStateChanged((user) => {
          firebase.database().ref(`arrangementsList`).orderByChild('florist').equalTo(designer).once('value', function(snapshot) {
              var snapshotVal = snapshot.val();
              if (snapshotVal) {
                  thisRef.setState({
                      designsData: snapshotVal, 
                      loading: false, 
                      userID: user.uid
                  });
              }
          });
        });
    } else {
      console.log('user does not have a shop');
    }
  }
  componentDidMount () {
    window.scrollTo(0, 0);
  }
  componentWillUnmount () {
    //returns the unsubscribe function
    this.fireBaseListenerForDesigns && this.fireBaseListenerForDesigns();
  }
  handleChooseDesign(chosenKey) {
    this.setState({designsDetailsStatus: 1, selectedDesign: chosenKey, infoMessage: null, errorMessage: null});
  }
  handleBack() {
    this.setState({designsDetailsStatus: 0});
    var designer = this.props.designerCode;

    // reloading data since a review might have been posted
    base.fetch(`florists/${designer}`, {
        context: this,
        queries: {
            orderByChild: 'florist',
            equalTo: designer
        },
    });
  }
  newDesignIncomplete = () => {
    this.setState({errorMessage: strings.errorIncomplete});
  }

  handleNewDesign = (name, price, description, colorsArray, flowersArray, croppedImg) => {
    var designerCode = this.props.designerCode;
    var storageRef = firebase.storage().ref();

    base.fetch(`florists/${designerCode}/`, {
      context: this,
      then(data) {
        if (data.uid === this.state.userID) {

          var immediatelyAvailableReference = base.push(`arrangementsList`, {
            data: {
                approval: 'approved',
                color: colorsArray,
                currency: data.currency,
                deliveryAreas: data.deliveryAreas,
                description: description,
                florist: designerCode,
                floristName: data.name,
                floristUserID: data.uid,
                flower: flowersArray,
                name: name,
                price: price,
                seasonality: 'all',
                city: data.city
            }
          }).then((newLocation) => {

              var newLocationKey = newLocation.key;
              var newRef = storageRef.child(`${newLocationKey}.jpg`);
              var downloadURL;

              //update florist nodex
              base.post(`florists/${designerCode}/arrangements/${newLocationKey}`, {
                data: {
                  id: newLocationKey,
                  name: name,
                }
              });

              //first upload the image
              newRef.putString(croppedImg, 'data_url').then((snapshot) => {

                downloadURL = snapshot.downloadURL;
                //then update the design record with the new url
                base.update(`arrangementsList/${newLocationKey}`, {
                  data: {
                      image: downloadURL,
                      id: newLocationKey,
                  }              
                });
                this.setState({ infoMessage: strings.designCreated}, () => this.updateDesignsList());

            }).catch(err => {
              console.log('An error occured when creating design.');
              this.setState({ errorMessage: strings.errorOccured});
            });
          });
         } else {
          console.log('user id does not match shop record');
        }
      }
    })
  }

  handleDesignUpdate = (selectedDesign, name, price, description, color, flower, croppedImg, newImageFlag) => {

    if (newImageFlag) {
      var storageRef = firebase.storage().ref();
      var newRef = storageRef.child(`${selectedDesign}.jpg`);
      var downloadURL;

      //first upload the image and ge tthe url path
      newRef.putString(croppedImg, 'data_url').then((snapshot) => {
        downloadURL = snapshot.downloadURL;

        //then update the design record with the new url
        base.update(`arrangementsList/${selectedDesign}`, {
          data: {
              name: name,
              price: price,
              description: description,
              color: color,
              flower: flower,
              image: downloadURL
          }
        }).then(() => 
              this.setState({ infoMessage: strings.designUpdated}, () => window.scrollTo(0, 0))
          ).catch(err => {
              console.log('An error occured when updating design.');
              this.setState({ errorMessage: strings.errorOccured});
          });
      })
    } else {
      base.update(`arrangementsList/${selectedDesign}`, {
        data: {
            name: name,
            price: price,
            description: description,
            color: color,
            flower: flower,
        }
      }).then(() => 
            this.setState({ infoMessage: strings.designUpdated}, () => window.scrollTo(0, 0))
        ).catch(err => {
            console.log('An error occured when updating design.');
            this.setState({ errorMessage: strings.errorOccured});
        });
    }
  }

  updateDesignsList = () => {
    var designer = this.props.designerCode;
    var thisRef = this;
        firebase.database().ref(`arrangementsList`).orderByChild('florist').equalTo(designer).once('value', function(snapshot) {
            var snapshotVal = snapshot.val();
            if (snapshotVal) {
                thisRef.setState({
                    designsData: snapshotVal,
                    designsDetailsStatus: 0,
                });
            }
        });
  }

  render () {

    var data = this.state.designsData;
    var loadingState = this.state.loading;
    var designsDetailsStatus = this.state.designsDetailsStatus;
    var designs;
    var designsHeader;

    // console.log('data check: ', Object.keys(data).length);
    if (Object.keys(data).length===0) {
      designsHeader = null;
      designs = (
        <div className="no-sub-section">            
          <div className="center-text">{strings.noDesign}</div>
        </div>
      )
    } else {
      designsHeader = (
        <Grid>
          <Row className="designs-list-titles">
            <Col xs={6}>{strings.design}</Col>
            <Col xs={6}>{strings.price}</Col>
          </Row>
        </Grid>
      );
      designs = Object.keys(data).map(function(key) {
        var chosenKey = data[key].id;
        return (
          <div key={key} onClick={() => this.handleChooseDesign(chosenKey)}>
            <Grid>
              <div className="design-list-item">
                <Row className="show-grid">
                    <Col xs={6}>
                        <div>{data[key].name}</div>
                    </Col>
                    <Col xs={6}>
                      <div>{data[key].currency} {data[key].price}</div>
                    </Col>
                </Row>
              </div>
            </Grid>
          </div>
        )
      }, this)
    }
  
    let content = null;
    if (loadingState) {
      content = (
        <div>
          <div className="horizontal-line"></div>
          <div className="loader"></div>
        </div>
      )
    } else if (designsDetailsStatus===0){
      content = (
        <div>
          <Grid>
            <Row className="show-grid loggedin-flow">
              <div className="horizontal-line"></div>
              <Col xs={12}>
                  <div className="flow-selected">{strings.allDesigns}</div>
                    <i className="fa fa-chevron-right"></i>
                  <div>{strings.designsUpdate}</div>
              </Col>
              <div className="horizontal-line"></div>
            </Row>
          </Grid>
          {designsHeader}
          {designs}
          <div className="new-design-button-box">
            <i className="fa fa-plus-circle fa-6x" aria-hidden="true" onClick={() => this.setState({designsDetailsStatus: 2, infoMessage: null, errorMessage: null}, () => {window.scrollTo(0, 0);})}></i>
          </div>
        </div>
      )
    } else if (designsDetailsStatus===1) {
      content = (
        <div>
          <Grid>
            <Row className="show-grid loggedin-flow">
              <div className="horizontal-line"></div>
              <Col xs={12}>
                  <div className='flow-nav' onClick={() => this.setState({designsDetailsStatus: 0}, () => {window.scrollTo(0, 0);})}>{strings.allDesigns}</div>
                    <i className="fa fa-chevron-right"></i>
                  <div className="flow-selected">{strings.designsUpdate}</div>
              </Col>
              <div className="horizontal-line"></div>
            </Row>
          </Grid>
          <DesignDetails
            selectedDesign={this.state.selectedDesign}
            infoMessage={this.state.infoMessage}
            errorMessage={this.state.errorMessage}
            onHandleBack={this.handleBack}
            designerCode={this.props.designerCode}
            onHandleDesignUpdate={this.handleDesignUpdate}
            onDesignDeleteSuccess={this.updateDesignsList}
          />
        </div>
      )
    } else if (designsDetailsStatus===2) {
      content = (
        <div>
          <Grid>
            <Row className="show-grid loggedin-flow">
              <div className="horizontal-line"></div>
              <Col xs={12}>
                  <div className='flow-nav' onClick={() => this.setState({designsDetailsStatus: 0}, () => {window.scrollTo(0, 0);})}>{strings.allDesigns}</div>
                    <i className="fa fa-chevron-right"></i>
                  <div className="flow-selected">{strings.newDesign}</div>
              </Col>
              <div className="horizontal-line"></div>
            </Row>
          </Grid>
          <NewDesign
            infoMessage={this.state.infoMessage}
            errorMessage={this.state.errorMessage}
            onHandleBack={this.handleBack}
            designerCode={this.props.designerCode}
            onHandleNewDesign={this.handleNewDesign}
            onNewDesignIncomplete={this.newDesignIncomplete}
          />
        </div>
      )
    }
    

    return (
      <div className="loggedin-background">
        <Grid> 
          <Row className="head-button-inline">
            <div className="head-button-section">            
              <Route path="/" render={(props) => <ButtonToShop {...props}/>} />
            </div>
            <div className="head-button-section">            
              <Route path="/" render={(props) => <ButtonToAccount {...props}/>} />
            </div>
          </Row>
          <Row className="show-grid loggedin-nav">
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/ordersdashboard">
                <i className="fa fa-book fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.ordersDashboard1}<br/>{strings.ordersDashboard2}</div>
              </Link>
            </Col>
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/designs" className="nav-selected">
                <i className="fa fa-star fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.designs1}<br/>{strings.designs2}</div>
              </Link>
            </Col>
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/shopinfo">
                <i className="fa fa-home fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.shopInformation1}<br/>{strings.shopInformation2}</div>
              </Link>
            </Col>
          </Row>
          <Row className="show-grid loggedin-margin-box">
            <Col className="loggedin-content">
              {content}
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}