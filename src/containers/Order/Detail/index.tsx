import {
  Button,
  Col,
  Row,
  Space,
  Table,
  Typography,
  Skeleton,
  Layout,
} from 'antd';
import { useEffect, useState } from 'react';
import orderApi from 'api/order.api';
import { useParams } from 'react-router-dom';
import numeral from 'numeral';

export default function OrderDetail() {
  const params = useParams();
  const id = params;
  const [orderData, setOrderData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const res = orderApi.detail(id);
    if (res.success) {
      setOrderData(res.data);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <Layout>
      <Row align="middle" justify="space-between">
        <Typography.Title level={4}>Chi tiết đơn hàng</Typography.Title>
        <Button type="primary" className="rounded-md">
          Quay lại
        </Button>
      </Row>

      <Typography.Title level={5}>Thông tin chung</Typography.Title>
      <Space>
        <Col>
          <p>Tên khách hàng: {orderData.order.customer}</p>
          <p>Địa chỉ: {orderData.order.address}</p>
          <p>Số điện thoại: {orderData.order.phone}</p>
          <p>
            <strong>
              Tổng giá trị đơn hàng:
              {numeral(orderData.totalSupply + orderData.totalProduct).format(
                '0,0'
              ) + 'đ'}
            </strong>
          </p>
          {/* Add other order information as needed */}
        </Col>
      </Space>
      <Typography.Title level={5}>Danh sách sản phẩm</Typography.Title>
      <Table
        size="large"
        dataSource={orderData.products}
        pagination={false}
        footer={() => (
          <div className="flex justify-end ">
            <strong>
              Tổng cộng: {numeral(orderData.totalProduct).format('0,0') + 'đ'}
            </strong>
          </div>
        )}
        className="w-full"
        // Add other table configurations as needed
      >
        {/* Define columns based on the product data structure */}
        <Table.Column title="Tên sản phẩm" dataIndex="name" key="name" />
        <Table.Column title="Kích thước" dataIndex="size" key="size" />
        <Table.Column title="Số lượng" dataIndex="quantity" key="quantity" />
        <Table.Column title="Đơn vị" dataIndex="unit" key="unit" />
        <Table.Column
          title="Đơn giá"
          key="unit_price"
          render={(text, record: any) => (
            <span>{numeral(record.unit_price).format('0,0') + 'đ'}</span>
          )}
        />
        <Table.Column
          title="Thành tiền"
          key="total"
          render={(text, record: any) => (
            <span>
              {numeral(record.quantity * record.unit_price).format('0,0') + 'đ'}
            </span>
          )}
        />
        {/* Add other columns as needed */}
      </Table>

      <Typography.Title level={5}>Danh sách vật tư</Typography.Title>
      <Table
        size="large"
        dataSource={orderData.supplies}
        pagination={false}
        className="w-full"
        footer={() => (
          <div className="flex justify-end ">
            <strong>
              Tổng cộng: {numeral(orderData.totalSupply).format('0,0') + 'đ'}
            </strong>
          </div>
        )}
        // Add other table configurations as needed
      >
        {/* Define columns based on the supply order data structure */}
        <Table.Column
          title="Tên vật tư"
          dataIndex={['Supply', 'name']}
          key="supplyName"
        />
        <Table.Column
          title="Mã vật tư"
          dataIndex={['Supply', 'code']}
          key="supplyCode"
        />
        <Table.Column
          title="Đơn vị"
          dataIndex={['Supply', 'unit']}
          key="supplyUnit"
        />
        <Table.Column
          title="Số lượng"
          dataIndex="quantity"
          key="supplyQuantity"
        />
        <Table.Column
          title="Đơn giá"
          key="supplyUnitPrice"
          render={(text, record: any) => (
            <span>
              {numeral(record.Supply?.unit_price).format('0,0') + 'đ'}
            </span>
          )}
        />
        <Table.Column
          title="Thành tiền"
          key="total"
          render={(text, record: any) => (
            <span>
              {numeral(record.quantity * record.Supply?.unit_price).format(
                '0,0'
              ) + 'đ'}
            </span>
          )}
        />
        {/* Add other columns as needed */}
      </Table>
    </Layout>
  );
}
