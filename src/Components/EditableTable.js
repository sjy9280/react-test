import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input, Table } from 'antd';

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
        rules={ [
          {
            required: true,
            message: `${ title } is required.`,
          },
        ] }
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
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.columns = props.columns
    this.state = {
      dataSource: props.dataSource
    }
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        dataSource: nextProps.dataSource
      })
    }
  }

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
          rowKey={ Math.random }
          bordered
          dataSource={ dataSource }
          columns={ columns }
        />
      </div>
    );
  }
}

export default EditableTable
