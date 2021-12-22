import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input, Table } from 'antd';
import { connect } from "react-redux";
import { editInventory } from "../features/sku/skuSlice";


const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={ form } component={ false }>
      <EditableContext.Provider value={ form }>
        <tr { ...props } />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
                        title,
                        editable,
                        children,
                        dataIndex,
                        record,
                        handleSave,
                        ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={ {
            margin: 0,
          } }
          name={ dataIndex }
        >
          <Input ref={ inputRef } onPressEnter={ save } onBlur={ save }/>
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={ {
            paddingRight: 24,
          } }
          onClick={ toggleEdit }
        >
          { children }
        </div>
      );
    }

    return <td { ...restProps }>{ childNode }</td>;
  }
;

class EditableTable extends React.Component {

  constructor(props) {
    super(props);
    this.columns = props.columns
    this.state = {
      dataSource: props.dataSource
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: nextProps.dataSource
    });
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    console.log(newData)
    this.props.dispatch(editInventory({ row }))
    this.setState({
      dataSource: newData,
    });
  };


  render() {
    const { dataSource } = this.state;

    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    return (
      <div>
        <Table
          components={ components }
          rowClassName={ () => 'editable-row' }
          bordered
          dataSource={ dataSource }
          columns={ columns }
          pagination={ false }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sku: state.skuList
});

export default connect(mapStateToProps)(EditableTable)
