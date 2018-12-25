import React, { PureComponent } from 'react';
import modeInfo from './modes';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';

import 'codemirror/theme/3024-day.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/theme/abcdef.css';
import 'codemirror/theme/ambiance-mobile.css';
import 'codemirror/theme/ambiance.css';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/theme/base16-light.css';
import 'codemirror/theme/bespin.css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/colorforth.css';
import 'codemirror/theme/darcula.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/duotone-dark.css';
import 'codemirror/theme/duotone-light.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/elegant.css';
import 'codemirror/theme/erlang-dark.css';
import 'codemirror/theme/gruvbox-dark.css';
import 'codemirror/theme/hopscotch.css';
import 'codemirror/theme/icecoder.css';
import 'codemirror/theme/idea.css';
import 'codemirror/theme/isotope.css';
import 'codemirror/theme/lesser-dark.css';
import 'codemirror/theme/liquibyte.css';
import 'codemirror/theme/lucario.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/mbo.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/theme/midnight.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/neat.css';
import 'codemirror/theme/neo.css';
import 'codemirror/theme/night.css';
import 'codemirror/theme/oceanic-next.css';
import 'codemirror/theme/panda-syntax.css';
import 'codemirror/theme/paraiso-dark.css';
import 'codemirror/theme/paraiso-light.css';
import 'codemirror/theme/pastel-on-dark.css';
import 'codemirror/theme/railscasts.css';
import 'codemirror/theme/rubyblue.css';
import 'codemirror/theme/seti.css';
import 'codemirror/theme/shadowfox.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/theme/ssms.css';
import 'codemirror/theme/the-matrix.css';
import 'codemirror/theme/tomorrow-night-bright.css';
import 'codemirror/theme/tomorrow-night-eighties.css';
import 'codemirror/theme/ttcn.css';
import 'codemirror/theme/twilight.css';
import 'codemirror/theme/vibrant-ink.css';
import 'codemirror/theme/xq-dark.css';
import 'codemirror/theme/xq-light.css';
import 'codemirror/theme/yeti.css';
import 'codemirror/theme/zenburn.css';

import styles from './App.less';
import CodeMirror from '@uiw/react-codemirror';

const themes = ['3024-day', '3024-night', 'abcdef', 'ambiance-mobile', 'ambiance', 'base16-dark', 'base16-light', 'bespin', 'blackboard', 'cobalt', 'colorforth', 'darcula', 'dracula', 'duotone-dark', 'duotone-light', 'eclipse', 'elegant', 'erlang-dark', 'gruvbox-dark', 'hopscotch', 'icecoder', 'idea', 'isotope', 'lesser-dark', 'liquibyte', 'lucario', 'material', 'mbo', 'mdn-like', 'midnight', 'monokai', 'neat', 'neo', 'night', 'oceanic-next', 'panda-syntax', 'paraiso-dark', 'paraiso-light', 'pastel-on-dark', 'railscasts', 'rubyblue', 'seti', 'shadowfox', 'solarized', 'ssms', 'the-matrix', 'tomorrow-night-bright', 'tomorrow-night-eighties', 'ttcn', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light', 'yeti', 'zenburn'];

const Select = ({ value, options, onChange }) => {
  return (
    <select value={value} onChange={onChange}>
      {options.map((item, key) => {
        const optionProps = { key };
        if (value === item) {
          optionProps.value = item;
        }
        return (
          <option {...optionProps}> {item} </option>
        );
      })}
    </select>
  );
};


const SelectModes = ({ value, options, onChange }) => {
  const index = modeInfo.findIndex((item) => {
    if (item.ext) return item.ext.indexOf(value) > -1;
    else return item.mode === value;
  });
  return (
    <select value={index} onChange={onChange}>
      {options.map((item, key) => {
        const optionProps = { key };
        optionProps.value = key;
        return (
          <option {...optionProps}> {item.name} </option>
        );
      })}
    </select>
  );
};
export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      code: '',
      mode: 'jsx',
      theme: 'monokai',
    };
  }
  componentDidMount() {
    const { mode } = this.state;
    this.editor.focus();
    this.loadCode(mode);
  }
  loadCode(lang) {
    // import(`code-example/lib/${lang}.js`).then((data) => {
    //   this.setState({
    //     code: data.default,
    //   });
    // }).catch(() => {
    //   this.setState({ code: 'Please enter a sample code.' });
    // });
    // 在这里可以设置不同的代码片段
    this.setState({
      code: lang
    });
  }
  onChange(e) {
    const mode = modeInfo[e.target.value];
    const ext = mode.ext;
    if (ext) {
      this.loadCode(ext[0]);
      this.setState({ mode: ext[0] });
    }
  }
  onChangeTheme(e) {
    this.setState({ theme: e.target.value });
  }
  getInstance = (instance) => {
    if (instance) {
      this.codemirror = instance.codemirror;
      this.editor = instance.editor;
    }
  }
  render() {
    const { mode, theme } = this.state;
    return (
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <div className={styles.select}>
            <SelectModes value={mode} options={modeInfo} onChange={this.onChange.bind(this)} />
            <Select value={theme} options={themes} onChange={this.onChangeTheme.bind(this)} />
          </div>
        </header>
        <CodeMirror
          value={this.state.code}
          ref={this.getInstance}
          width={600}
          height={600}
          options={{
            theme,
            keyMap: 'sublime',
            fullScreen: true,
            mode,
          }}
        />
      </div>
    );
  }
}
