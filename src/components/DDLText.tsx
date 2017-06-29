import * as React from 'react';
import { Button, InputGroup, InputGroupAddon, Col, Row,
  ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import Icon from 'react-fa';

export interface IDDLItem {
    key: string;
    label: string;
}

export interface IDDLTextProps {
  header: string;
  default?: string;
  height: number;
  locked?: boolean;
  values: IDDLItem[];
  onSubmit: (v: string) => void;
}

interface IDDLTextState {
  value: string;
  edit: boolean;
  dropdownOpen: boolean;
}

export interface IDDLTextEvent {
  target: { value: string };
}

class DDLText extends React.Component<IDDLTextProps, IDDLTextState> {
  constructor(props: IDDLTextProps) {
    super(props);

    this.state = {
      edit: false,
      dropdownOpen: false,
      value: (this.props.default ? this.props.default : '')
    };

    this.startEdit = this.startEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);
    this.toggleDDL = this.toggleDDL.bind(this);
    this.select = this.select.bind(this);
    this.getLabelForSelectedKey = this.getLabelForSelectedKey.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderDropdownList = this.renderDropdownList.bind(this);
    this.renderDropdownItems = this.renderDropdownItems.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  startEdit() {
    if (this.props.locked ? false : true)  {
      this.setState({edit: true, dropdownOpen: false});
    }
  }

  endEdit() {
    this.setState({edit: false, dropdownOpen: false});
    if (this.state.value !== this.props.default) {
      this.props.onSubmit(this.state.value);
    }
  }

  toggleDDL() {
    this.setState({dropdownOpen: !this.state.dropdownOpen});
  }

  select(key: string) {
    this.setState({value: key});
  }

  getLabelForSelectedKey(): string {
    return this.props.values.map(
      ({key, label}: IDDLItem) => { return ( key === this.state.value ? label : ''); }
    ).filter(
      (e: string) => { return e !== ''; }
    ).join(', ');
  }

  renderHeader(): JSX.Element {
    return (<Col><h4>{this.props.header} :</h4></Col>);
  }

  renderButton(labelForSelectedKey: string): JSX.Element {
    const btnOk = (<Button onClick={this.endEdit} color="success"><Icon name="check" /></Button>);
    const btnKo = (<Button color="danger"><Icon name="times" /></Button>);
    return (labelForSelectedKey.length > 0) ? btnOk : btnKo;
  }

  renderDropdownItems(): JSX.Element[] {
    return this.props.values.map( ({key, label}: IDDLItem) => {
      return (
        <DropdownItem key={key} onClick={() => {this.select(key); }}>
          {label}
        </DropdownItem>
      );
    });
  }

  renderDropdownList(): JSX.Element {
    const labelForSelectedKey = this.getLabelForSelectedKey();
    return (
      <Row style={{height: this.props.height}} >
        {this.renderHeader()}
        <Col>
          <InputGroup>
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDDL}>
              <DropdownToggle caret={true}>
                {labelForSelectedKey.length > 0 ? labelForSelectedKey : this.state.value}
              </DropdownToggle>
              <DropdownMenu>
                {this.renderDropdownItems()}
              </DropdownMenu>
            </ButtonDropdown>
            <InputGroupAddon>
                {this.renderButton(labelForSelectedKey)}
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
    );
  }

  renderValue(): JSX.Element {
    const labelForSelectedKey = this.getLabelForSelectedKey();
    return (
      <Row onClick={this.startEdit} role="button" style={{height: this.props.height}}>
        {this.renderHeader()}
        <Col>
          {labelForSelectedKey.length > 0 ? labelForSelectedKey : this.state.value}
        </Col>
      </Row>
    );
  }

  render(): JSX.Element {
    return (this.state.edit) ? this.renderDropdownList() : this.renderValue();
  }
}

export default DDLText;