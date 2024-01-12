import {
  Button,
  Table,
  Typography,
  Skeleton,
  Descriptions,
  Card,
  Divider,
  PageHeader,
} from 'antd';
import { useEffect, useState } from 'react';
import orderApi from 'api/order.api';
import { useNavigate, useParams } from 'react-router-dom';
import numeral from 'numeral';

const { Title } = Typography;

const defaultOrder = {
  order: {
    id: 7,
    customer: 'A Hoaf',
    order_date: null,
    address: 'Van nam',
    phone: '01211212121',
    advance_payment: null,
    advance_payment_date: null,
    full_payment_date: null,
    createdAt: '2023-11-19T20:33:24.000Z',
    updatedAt: '2023-11-19T20:33:24.000Z',
    status_id: 1,
    Supply_Orders: [
      {
        id: 13,
        quantity: 100,
        Supply: {
          id: 3,
          name: 'Đinh 10',
          image:
            'https://res.cloudinary.com/dmxc3vjn2/image/upload/v1695724919/supply/o14ru73t0yiah1hg39ew.jpg',
          code: 'DINH10',
          unit: 'cái',
          quantity: 100,
          unit_price: 500000,
          manufacturing_country: 'Trung quốc',
          createdAt: '2023-09-22T15:39:36.000Z',
          updatedAt: '2023-09-26T17:41:59.000Z',
        },
      },
      {
        id: 14,
        quantity: 10000,
        Supply: {
          id: 6,
          name: 'Ốc 10',
          image: null,
          code: 'OC10',
          unit: 'cái',
          quantity: 1500,
          unit_price: 1200,
          manufacturing_country: 'Thái Lan',
          createdAt: '2023-09-26T17:23:21.000Z',
          updatedAt: '2023-09-26T17:23:21.000Z',
        },
      },
    ],
    Products: [
      {
        id: 24,
        name: 'Giuong ngu',
        size: '1,6x2m',
        quantity: 1,
        unit: 'cai',
        unit_price: 20000000,
        createdAt: '2023-11-19T20:33:25.000Z',
        updatedAt: '2023-11-19T20:33:25.000Z',
        order_id: 7,
      },
      {
        id: 25,
        name: 'TU bep',
        size: '3x2m',
        quantity: 2,
        unit: 'cai',
        unit_price: 32600000,
        createdAt: '2023-11-19T20:33:25.000Z',
        updatedAt: '2023-11-19T20:33:25.000Z',
        order_id: 7,
      },
    ],
  },
  totalProduct: 85200000,
  totalSupply: 62000000,
};

export default function OrderDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const [orderData, setOrderData] = useState<any>(defaultOrder);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    orderApi
      .detail(id)
      .then((res: any) => {
        console.log(res);

        if (res.data.success) {
          setOrderData(res.data.data);
        }
      })
      .catch()
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <PageHeader
        onBack={() => null}
        title="Chi tiết đơn hàng "
        subTitle={`#${orderData.order.id}`}
        extra={[
          <Button type="default" loading={loading}>
            Cập nhật
          </Button>,
        ]}
      >
        <Card>
          <Skeleton />
        </Card>
      </PageHeader>
    );
  }

  return (
    <PageHeader
      onBack={() => navigate('/orders/list')}
      title="Chi tiết đơn hàng "
      subTitle={`#${orderData.order.id}`}
      extra={[<Button type="primary">Cập nhật</Button>]}
    >
      <Card>
        <Descriptions title="Thông tin chung">
          <Descriptions.Item label="Tên khách hàng">
            {orderData.order.customer}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {orderData.order.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {orderData.order.address}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng giá trị đơn hàng">
            {numeral(orderData.totalSupply + orderData.totalProduct).format(
              '0,0'
            ) + 'đ'}
          </Descriptions.Item>
        </Descriptions>
        <Divider />

        <Descriptions title="Danh sách sản phẩm" />
        <Table
          size="large"
          dataSource={orderData.order.Products}
          pagination={false}
          footer={() => (
            <div className="flex justify-end ">
              <strong>
                Tổng: {numeral(orderData.totalProduct).format('0,0') + 'đ'}
              </strong>
            </div>
          )}
          className="w-full"
          loading={loading}
        >
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
                {numeral(record.quantity * record.unit_price).format('0,0') +
                  'đ'}
              </span>
            )}
          />
        </Table>
        <Divider />
        <Descriptions title="Danh sách vật tư" />
        <Table
          size="large"
          loading={loading}
          dataSource={orderData.order.Supply_Orders}
          pagination={false}
          className="w-full"
          footer={() => (
            <div className="flex justify-end ">
              <strong>
                Tổng: {numeral(orderData.totalSupply).format('0,0') + 'đ'}
              </strong>
            </div>
          )}
        >
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
        </Table>
      </Card>
    </PageHeader>
  );
}
