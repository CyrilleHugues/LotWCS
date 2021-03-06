import * as classnames from 'classnames';
import * as React from 'react';
import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

export interface ITabsProps {
  defaultTab?: string;
}

interface ITabsState {
  activeTab?: string;
}

class Tabs extends React.Component<ITabsProps, ITabsState> {
  constructor(props: ITabsProps) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: this.props.defaultTab,
    };
  }
  public render() {
    return (
      <Container>
        <Nav tabs={true}>
        {React.Children.map(this.props.children, (child: any) => {
          const toggleMe = () => this.toggle(child.props.tabId);
          return (<NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === child.props.tabId })}
                      onClick={toggleMe}
                    >
                      {child.props.title}
                    </NavLink>
                  </NavItem>);
          }
        )}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
        {React.Children.map(this.props.children, (child: any) => {
          return (<TabPane tabId={child.props.tabId} >
                    {child.props.children}
                  </TabPane>);
          }
        )}
        </TabContent>
      </Container>
    );
  }

  private toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
}

export { Tabs };
