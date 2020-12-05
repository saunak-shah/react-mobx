import React, { Component } from "react";
import { Select } from "antd";
import { observer } from "mobx-react";
const { Option } = Select;
const languageList = [
  {
    name: "English",
    key: "en",
    id: 1,
    image_url: ""
  },
  {
    name: "Hindi",
    key: "hi",
    id: 2,
    image_url: ""
  },
  {
    name: "Gujarati",
    key: "gu",
    id: 3,
    image_url: ""
  },
  {
    name: "Chinese",
    key: "zh",
    id: 4,
    image_url: ""
  }
];
@observer
class LanguageSelect extends Component {
  render() {
    const { locale } = this.props;
    return (
      <div className="language-select-div">
        <Select
          showSearch
          className="language-select"
          style={{ width: 100 }}
          defaultValue={locale.value}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={(value) => {
            locale.value = value;
          }}
        >
          {languageList.map((lang) => {
            return (
              <Option value={lang.key} key={lang.id}>
                {lang.name}
              </Option>
            );
          })}
        </Select>
      </div>
    );
  }
}

export default LanguageSelect;
