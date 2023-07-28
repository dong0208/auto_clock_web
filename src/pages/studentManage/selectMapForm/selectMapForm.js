import React from 'react'
import { Map, Marker } from "react-amap";
import { Select, Spin } from 'antd'
import debounce from "lodash/debounce";
import SelfInputNumber from '../InputNumberSelf/index'
import { handleSelectApi,updatePositionApi } from './api'
const Option = Select.Option;
class SelectMapForm extends React.Component {
  state = {
    addressOption: [],
    addressOptionFetching: false,
    addressSearchValue: {},
  };
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.handleSelectAddressSearch = debounce(
      this.handleSelectAddressSearch,
      1000
    );
  }
  province_city_region_cut = (province_city_region) => {
    const reg = /.+?(省|自治区|直辖市|特别行政区|市|区|自治州|盟|县|自治县)/g; //
    var addressArr = province_city_region.match(reg)
    const first = addressArr[0]
    if (first.includes("北京") || first.includes("上海") || first.includes("天津") || first.includes("重庆") || first.includes("香港") || first.includes("澳门") || first.includes("台湾")) {
      addressArr.unshift(addressArr[0])
    }
    if (addressArr.length == 2) {
      addressArr.push(addressArr[1])
    }
    return addressArr
  }

  // 更新点位置
  updateMarkerPosition = async (event) => {
    const {
      lnglat: { lng, lat },
    } = event;
    const {city,district,latitude,longitude,mapAddress,province}  = await updatePositionApi(lat,lng)
    
    this.props.onChange({
      longitude,
      latitude,
      province,
      city,
      district,
      mapAddress
    });
  };

  mapEvents = {
    click: this.updateMarkerPosition,
  };

  markerEvents = {
    created: (ins) => { },
    dragend: this.updateMarkerPosition,
  };
  handleSelectAddressChange = (value, searchOption) => {
    this.props.setIsUpdate && this.props.setIsUpdate(true)
    const { item } = searchOption.props;
    this.setState({
      addressOption: [],
      addressOptionFetching: false,
    });
    let cut_arr = this.province_city_region_cut(item.district)
    this.props.onChange({
      longitude: item.location.split(",")[0],
      latitude: item.location.split(",")[1],
      province: cut_arr[0],
      city: cut_arr[1],
      district: cut_arr[2],
      mapAddress: item.district + item.address + item.name,
    });
  };

  handleSelectAddressSearch = (value) => {
    //替换字符串中的所有特殊字符（包含空格） 江苏省苏州市工业园区东富路8号润家乐璟悸动1  生活社区B104—1
    if (!value) return;
    const pattern = /[`~!@#$^&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
    value = value.replace(pattern, "");
    this.setState({
      addressOptionFetching: true,
      addressOption: [],
    })
    handleSelectApi({
      keyword: value,
    }).then((res) => {
      this.setState({
        addressOption: res.addressOption || [],
        addressOptionFetching: false,
      });
    }).catch((err) => {
      this.setState({
        addressOptionFetching: false,
      });
    })
  };


  render() {
    const {
      value: { longitude, latitude, mapAddress },
    } = this.props;
    const { addressOptionFetching, addressOption } = this.state;
    return (
      <>
        <div className="map-box">
          <Select
            showSearch
            placeholder="搜索地点"
            style={{ width: "100%", marginBottom: "16px" }}
            onChange={this.handleSelectAddressChange}
            onSearch={this.handleSelectAddressSearch}
            filterOption={false}
            labelInValue
            value={
              mapAddress ? { label: mapAddress, key: mapAddress } : undefined
            }
            notFoundContent={
              addressOptionFetching ? <Spin size="small" /> : "没有找到"
            }
          >
            {addressOption.map((d) => {
              if (typeof (d.district) == "string" && typeof (d.address) == "string" && typeof (d.name) == "string" && typeof (d.location) == "string") {
                return <Option item={d} key={d.id}>
                  {d.district + d.address + d.name}
                </Option>
              }
            })}
          </Select>

          <Map
            plugins={["ToolBar"]}
            events={this.mapEvents}
            zoom={17}
            center={
              longitude
                ? { longitude, latitude }
                : { longitude: "116.39747", latitude: "39.908823" }
            }
            className='h300'
          >
            {longitude && latitude && (
              <Marker
                draggable={true}
                events={this.markerEvents}
                position={{
                  longitude,
                  latitude,
                }}
              />
            )}
          </Map>
        </div>

        <div className="lat-box">
          <SelfInputNumber addonBefore="经度" value={longitude} />
          <SelfInputNumber addonBefore="纬度" value={latitude} />
        </div>
      </>
    );
  }
}


export default SelectMapForm