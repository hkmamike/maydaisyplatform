import React, { Component } from 'react';
import { Grid, Row, Col, DropdownButton, MenuItem, Button} from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import LocalizedStrings from 'react-localization';
import { Helmet } from 'react-helmet';

let strings = new LocalizedStrings({
    en:{
      signUp: 'Sign Up',
      homeImgTitle: 'Shop directly from emerging flower shops and independent artists.',
      homeImgSubtitle: 'Where are the flowers going?',
      go: 'Go',
      select_region: 'Anywhere in HK',
      specialPickUpLocation: 'Self Pick Up',
      HK_CentralWestern: 'Central & Western',
      HK_Eastern: 'Eastern',
      HK_Southern: 'Southern',
      HK_WanChai: 'Wan Chai',
      KL_KowloonCity: 'Kowloon City',
      KL_KwunTong: 'Kwun Tong',
      KL_ShamShuiPo: 'Sham Shui Po',
      KL_WongTaiSin: 'Wong Tai Sin',
      KL_YauTsimMong: 'Yau Tsim Mong',
      NT_Islands: 'Outlying Islands',
      NT_KwaiTsing: 'Kwai Tsing',
      NT_North: 'Northern Region',
      NT_SaiKung: 'Sai Kung',
      NT_ShaTin: 'Sha Tin',
      NT_TaiPo: 'Tai Po',
      NT_TsuenWan: 'Tsuen Wan',
      NT_TuenMun: 'Tuen Mun',
      NT_YuenLong: 'Yuen Long',
      howItWorks1: ' ',
      howItWorks2: 'MayDaisy',
      howItWorks3: ' ',
      howItWorks4: ' Marketplace',
      flowerShop: 'Flower Shops',
      flowerShopText: "Find emerging flower shops and floral artists in our marketplace, reference reviews to see how others' experience went.",
      artist: 'Independent Artists',
      artistText: "If planning ahead for special occasions, consider our independent floral artists for their distinctive styles.",
      trustAndConvenience: 'Trust and Convenience',
      trustAndConvenienceText: 'We hold our florists to a high artistic and customer service standard; Shopping with us is convient with our quick checkout features.',
      aboutUs1: 'About',
      aboutUs2: 'MayDaisy',
      aboutUsText: "MayDaisy is a marketplace and community to connect customers with great florists in their city. By bringing the best florists together in one place, we can focus resources on your flowers and spend less on reaching you. MayDaisy also provides a channel for established and emerging independent floral artists to reach a broader audience. Independent artists do not operate a flower shop full time, but they offer dinstinctive styles that cannot be found anywhere else!", 
      joinNow: "Join the flower lovers' MayDaisy movement now ",

      shopByCategory: 'Shop by category',
      bouquetsPicTitle: 'Bouquets',
      driedPicTitle: 'Dried & Preserved',
      hampersPicTitle: 'Hampers',

      popularFlorists: 'Popular Florists',
      
      metaTitle: 'MayDaisy - Flower MarketPlace',
      metaDescription: 'Flower marketplace and floral art community. Discover emerging artists, flower shops, and online flower shops. We curate signature designs of bouquets, hampers, arrangements, dried flowers, and preserved flowers.',
    },
    zh: {
      signUp: '報名',
      homeImgTitle: '鮮花市集，一網搜盡最潮最優雅的花店和獨立花藝師。',
      homeImgSubtitle: '查看哪個服務區域的花藝師?',
      go: '去市集',
      select_region: '香港所有',
      specialPickUpLocation: '免費自取',
      HK_CentralWestern: '中西區',
      HK_Eastern: '東區',
      HK_Southern: '南區',
      HK_WanChai: '灣仔區',
      KL_KowloonCity: '九龍城區',
      KL_KwunTong: '觀塘區',
      KL_ShamShuiPo: '深水埗區',
      KL_WongTaiSin: '黃大仙區',
      KL_YauTsimMong: '油尖旺區',
      NT_Islands: '離島區',
      NT_KwaiTsing: '葵青區',
      NT_North: '北區',
      NT_SaiKung: '西貢區',
      NT_ShaTin: '沙田區',
      NT_TaiPo: '大埔區',
      NT_TsuenWan: '荃灣區',
      NT_TuenMun: '屯門區',
      NT_YuenLong: '元朗區',
      howItWorks1: ' ',
      howItWorks2: '五月菊',
      howItWorks3: ' ',
      howItWorks4: '花藝市集',
      flowerShop: '大小花店',
      flowerShopText: '一網搜盡最潮最優雅的花店。看看評論令您對您的選擇更有信心。',
      artist: '獨立花藝師',
      artistText: '如果您是預早下單，可以考慮獨立花藝師們獨特風格的藝術花卉。',
      trustAndConvenience: '方便安心',
      trustAndConvenienceText: '五月菊對花藝師有極高的顧客服務和藝術要求; 快速下單功能令您的體驗更暢快。',
      aboutUs1: '關於',
      aboutUs2: '五月菊',
      aboutUsText: '五月菊是由花藝師們建立的一站式鮮花市集和花藝社群，我們的目標是為客人找到最好最適合他們的花卉設計。鮮花市集的模式令我們可以減低在市場推廣上花費的時間和資源，更集中的為您創造鮮花經驗。',
      joinNow: '快來加入愛花之人的五月菊運動 ',

      shopByCategory: '分類購物',
      bouquetsPicTitle: '花束',
      driedPicTitle: '乾花/保鮮花',
      hampersPicTitle: '禮品/花籃',

      popularFlorists: '熱門花店、花藝師',

      metaTitle: '五月菊 - 花藝市集',
      metaDescription: '五月菊是一個花藝市集和花藝師社群，我們發掘最潮最優雅的花店和網上花店，搜羅花藝師的標誌性作品，範疇包括花束、禮品、花籃、插花、擺設、乾花和保鮮花。立即網上訂花。',
    }
  });

const ButtonToMarket = ({ title, history, marketRegion, language }) => {
  return (<Button bsStyle="" className="button" onClick={() => history.push(`/${language}/arrangements/category/region/${marketRegion}`)}>{strings.go}</Button>);
}

export default class Homepage extends Component {

  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect = (eventKey) => {
    this.props.onMarketRegionSelect(eventKey);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.languageChanged==='zh') {
      strings.setLanguage('zh');
    } else if (nextProps.languageChanged==='en') {
      strings.setLanguage('en');
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillMount() {
    strings.setLanguage(this.props.languageChanged);
  }

  render() {
    const marketRegion = this.props.marketRegion;
    const language = this.props.languageChanged;

    return (
      <div className="no-padding">

        <Helmet>
          <title>{strings.metaTitle}</title>
          <meta name="description" content={strings.metaDescription} />
          <link rel="alternate" hrefLang="en" href="https://maydaisy.com/en/"/>
          <link rel="alternate" hrefLang="zh-Hant" href="https://maydaisy.com/zh/"/>
          <link rel="alternate" hrefLang="x-default" href="https://maydaisy.com/"/>
          {/* <html lang={this.props.languageChanged} /> */}
        </Helmet>
        
        <div className="home-image-container">
          <div className="home-image">
            <Grid>
              <Row className="show-grid">
                <Col md={5} className="home-image-prompt">
                  <h3 className="home-image-title">{strings.homeImgTitle}</h3>
                  <div className="home-image-pink">{strings.homeImgSubtitle}</div>
                  <DropdownButton title={strings[marketRegion]} className="home-image-select" id="bg-nested-dropdown" onSelect={this.handleSelect}>
                    <MenuItem eventKey="specialPickUpLocation">{strings.specialPickUpLocation}</MenuItem> 
                    <MenuItem eventKey="HK_CentralWestern">{strings.HK_CentralWestern}</MenuItem>
                    <MenuItem eventKey="HK_Eastern">{strings.HK_Eastern}</MenuItem>
                    <MenuItem eventKey="HK_Southern">{strings.HK_Southern}</MenuItem>
                    <MenuItem eventKey="HK_WanChai">{strings.HK_WanChai}</MenuItem>
                    <MenuItem eventKey="KL_ShamShuiPo">{strings.KL_ShamShuiPo}</MenuItem>
                    <MenuItem eventKey="KL_KowloonCity">{strings.KL_KowloonCity}</MenuItem>
                    <MenuItem eventKey="KL_KwunTong">{strings.KL_KwunTong}</MenuItem>
                    <MenuItem eventKey="KL_WongTaiSin">{strings.KL_WongTaiSin}</MenuItem>
                    <MenuItem eventKey="KL_YauTsimMong">{strings.KL_YauTsimMong}</MenuItem>
                    <MenuItem eventKey="NT_Islands">{strings.NT_Islands}</MenuItem>
                    <MenuItem eventKey="NT_KwaiTsing">{strings.NT_KwaiTsing}</MenuItem>
                    <MenuItem eventKey="NT_North">{strings.NT_North}</MenuItem>
                    <MenuItem eventKey="NT_SaiKung">{strings.NT_SaiKung}</MenuItem>
                    <MenuItem eventKey="NT_ShaTin">{strings.NT_ShaTin}</MenuItem>
                    <MenuItem eventKey="NT_TaiPo">{strings.NT_TaiPo}</MenuItem>
                    <MenuItem eventKey="NT_TsuenWan">{strings.NT_TsuenWan}</MenuItem>
                    <MenuItem eventKey="NT_TuenMun">{strings.NT_TuenMun}</MenuItem>
                    <MenuItem eventKey="NT_YuenLong">{strings.NT_YuenLong}</MenuItem>
                  </DropdownButton>
                  <Route path="/" render={(props) => <ButtonToMarket marketRegion={marketRegion} language={language} {...props}/>} />
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      
        <div className="how-it-works">
          <h2><span className="home-company-name">{strings.howItWorks2}</span>{strings.howItWorks4}</h2>
          <Grid>
            <Row className="show-grid">
              <Col sm={4}><i className="fa fa-list icons" aria-hidden="true"></i>
                <h3 className="icon-title">{strings.flowerShop}</h3>
                <div className="icon-description">{strings.flowerShopText}</div>
              </Col>
              <Col sm={4}><i className="fa fa-users icons" aria-hidden="true"></i>
                <h3 className="icon-title">{strings.artist}</h3>
                <div className="icon-description">{strings.artistText}</div>
              </Col>
              <Col sm={4}><i className="fa fa-heart icons" aria-hidden="true"></i>
                <h3 className="icon-title">{strings.trustAndConvenience}</h3>
                <div className="icon-description">{strings.trustAndConvenienceText}</div>
              </Col>
            </Row>
          </Grid>
        </div>

        <div className="home-pic-section">
          <h2>{strings.shopByCategory}</h2>
          <Grid className="show-grid home-pic-container">
            <Col sm={4} className="list-item">
              <Link to={`/${language}/arrangements/category/wrappedBouquets/region/`}>
                <div className="list-pic home-pic-1 " alt="link to wrappedBouquets"></div>
                <div className="text-box">
                  <div className="text-line">
                    <div className="home-pic-title">{strings.bouquetsPicTitle}</div>
                  </div>
                </div>
              </Link>
            </Col>

            <Col sm={4} className="list-item">
              <Link to={`/${language}/arrangements/category/driedPreserved/region/`}>
                <div className="list-pic home-pic-2" alt="link to dried flowers"></div>
                <div className="text-box">
                  <div className="text-line">
                    <div className="home-pic-title">{strings.driedPicTitle}</div>
                  </div>
                </div>
              </Link>
            </Col>

            <Col sm={4} className="list-item">
              <Link to={`/${language}/arrangements/category/hampers/region/`}>
                <div className="list-pic home-pic-3" alt="link to hampers"></div>
                <div className="text-box"> 
                  <div className="text-line">
                    <div className="home-pic-title">{strings.hampersPicTitle}</div>
                  </div>
                </div>
              </Link>
            </Col>
          </Grid>
        </div>

        <div className="home-pic-section">
          <h2>{strings.popularFlorists}</h2>
          <Grid className="show-grid home-pic-container">
            <Col sm={4} className="list-item">
                <Link to={`/${language}/florist/gigiflorist`}>
                  <div className="list-pic home-pic-4" alt="link to Gigiflorist's shop"></div>
                  <div className="text-box">
                  <div className="text-line">
                    <div className="home-pic-title">Gigiflorist</div>
                  </div>
                </div>
                </Link>
              </Col>
              <Col sm={4} className="list-item">
                <Link to={`/${language}/florist/ohjoyce`}>
                  <div className="list-pic home-pic-5" alt="link to Oh Joyce's shop"></div>
                  <div className="text-box">
                  <div className="text-line">
                    <div className="home-pic-title">::Oh Joyce::</div>
                  </div>
                </div>
                </Link>
              </Col>
              <Col sm={4} className="list-item">
                <Link to={`/${language}/florist/symplegarten`}>
                  <div className="list-pic home-pic-6" alt="link to SYMPLE Garten's shop"></div>
                  <div className="text-box">
                  <div className="text-line">
                    <div className="home-pic-title">SYMPLE GARTEN</div>
                  </div>
                </div>
                </Link>
              </Col>
          </Grid>
        </div>


        <div className="bar-pink">
          {strings.joinNow}<i className="fa fa-users"></i>
        </div>

      </div>
    )
  }
}
