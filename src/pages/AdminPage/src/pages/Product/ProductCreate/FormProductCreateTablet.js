import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Radio,
  Select,
  Typography,
  Upload,
} from 'antd';
import SimpleBackdrop from 'components/Backdrop/Backdrop';
import { UserContext } from 'contexts/UserContext';
import { getCategories, getCategorySubs } from 'features/Admin/Category/pathAPI';
import { createProduct } from 'features/Admin/Product/pathAPI';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { formItemLayout, tabletRam, tabletRom, tabletSc } from 'staticOptions';
import DescriptionCreate from './DescriptionCreate';

const { Title } = Typography;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function FormProductCreateTablet() {
  const history = useHistory();
  const { Option } = Select;
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const dispatch = useDispatch();

  // dispatch API
  const actionGetCategories = () => dispatch(getCategories());
  const actionGetCategorySubs = (_id) => dispatch(getCategorySubs(_id));
  const actionCreateProduct = (data, token) => dispatch(createProduct(data, token));

  //state
  const categories = useSelector((state) => state.category.categories);
  const loadingCategorySubs = useSelector((state) => state.category.loading);
  const state = useContext(UserContext);
  const [token] = state.token;
  const [body, setBody] = useState('');
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileListImage, setFileListImage] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    actionGetCategories(); // eslint-disable-next-line
  }, []);

  const handleChangeCategory = async (value) => {
    const subs = await actionGetCategorySubs(value);
    const resSubs = unwrapResult(subs);
    if (resSubs) {
      setSubOptions(resSubs);
      setShowSub(true);
    }
  };

  const handleChangeQuill = (e) => {
    setBody(e);
  };

  const onFinish = async (values) => {
    if (values) {
      const { name, price, priceCompare, shipping, quantity, category, ram, rom, sc, subs } =
        values;
      const formData = new FormData();
      setLoading(true);
      const newProduct = {
        name,
        description: body,
        price,
        priceCompare,
        shipping,
        quantity,
        subs,
        ram,
        rom,
        sc,
        category,
      };
      // append data product
      for (var index = 0; index < fileListImage.length; index++) {
        formData.append('image', fileListImage[index].originFileObj);
      }
      formData.append('product', JSON.stringify(newProduct));
      // Check Api Request
      const resultProduct = await actionCreateProduct(formData, token);
      const resProduct = unwrapResult(resultProduct);
      if (resProduct) {
        setLoading(false);
        form.resetFields();
        setFileListImage([]);
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        history.push('/admin/product');
        notification['success']({
          message: 'Th??ng B??o!',
          description: 'Th??m m???i th??nh c??ng',
        });
      }
    }
  };
  // image
  const handlePreview = async (file) => {
    try {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewVisible(true);
    } catch (error) {}
  };
  const handleChange = (f) => {
    const { file, fileList } = f;
    let isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    let isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJpgOrPng) {
      notification['error']({
        message: 'Th??ng B??o',
        description: 'B???n ch??? c?? th??? t???i l??n t???p JPG / PNG / JPEG !',
      });
    }
    if (!isLt2M) {
      notification['error']({
        message: 'Th??ng b??o',
        description: 'H??nh ???nh ph???i nh??? h??n 2MB ',
      });
    }
    if (isLt2M && isJpgOrPng) {
      setFileListImage(fileList);
    }
  };
  return (
    <>
      {loading && <SimpleBackdrop />}
      <Title level={4}>Th??m m???i tablet</Title>
      <Form
        form={form}
        {...formItemLayout}
        onFinish={onFinish}
        className="from-add-product from-edit-product"
        name="product"
      >
        <Form.Item
          label="T??n s???n ph???m"
          name="name"
          rules={[{ required: true, message: 'Vui l??ng nh???p t??n s???n ph???m!' }]}
        >
          <TextArea rows={2} maxLength={100} />
        </Form.Item>
        <DescriptionCreate body={body} handleChangeQuill={handleChangeQuill} />
        <Form.Item
          label="Gi?? ti???n"
          name="price"
          rules={[{ required: true, message: 'Vui l??ng nh???p gi?? ti???n' }]}
        >
          <InputNumber style={{ width: '100%' }} min={1} max={99999999} />
        </Form.Item>

        <Form.Item
          label="Gi?? ti???n ch??a gi???m"
          name="priceCompare"
          rules={[{ required: true, message: 'Vui l??ng nh???p gi?? ti???n ch??a gi???m' }]}
        >
          <InputNumber style={{ width: '100%' }} min={1} max={99999999} />
        </Form.Item>

        <Form.Item
          label="Giao h??ng"
          name="shipping"
          rules={[{ required: true, message: 'Vui l??ng ch???n ch???n giao h??ng!' }]}
        >
          <Radio.Group>
            <Radio value="Yes" defaultChecked>
              C??
            </Radio>
            <Radio value="No" defaultChecked>
              Kh??ng
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="S??? l?????ng"
          name="quantity"
          rules={[{ required: true, message: 'Vui l??ng nh???p s??? l?????ng s???n ph???m' }]}
        >
          <InputNumber style={{ width: '100%' }} min={1} max={999} />
        </Form.Item>

        <Form.Item
          name="sc"
          label="M??n h??nh"
          rules={[{ required: true, message: 'Vui l??ng ch???n lo???i m??n h??nh!' }]}
        >
          <Radio.Group>
            {tabletSc.map((v, i) => (
              <Radio key={i} value={v.value} defaultChecked>
                {v.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="ram"
          label="RAM"
          rules={[{ required: true, message: 'Vui l??ng ch???n lo???i ram!' }]}
        >
          <Select placeholder="Ch???n lo???i ram" mode="multiple">
            {tabletRam.map((v, i) => (
              <Option key={i} value={v.value}>
                {v.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="rom"
          label="B??? nh??? trong"
          rules={[{ required: true, message: 'Vui l??ng ch???n lo???i b??? nh??? trong!' }]}
        >
          <Select placeholder="Ch???n lo???i b?? nh??? trong" mode="multiple">
            {tabletRom.map((v, i) => (
              <Option key={i} value={v.value}>
                {v.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="category"
          label="Danh m???c"
          rules={[{ required: true, message: 'Vui l??ng ch???n danh m???c!' }]}
        >
          <Select placeholder="Ch???n danh m???c" onChange={handleChangeCategory}>
            {categories.length > 0 &&
              categories.map((c, i) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        {showSub && (
          <Form.Item
            name="subs"
            label="Th????ng hi???u"
            rules={[{ required: true, message: 'Vui l??ng ch???n th????ng hi???u!' }]}
          >
            {loadingCategorySubs ? (
              <LoadingOutlined style={{ fontSize: 24 }} spin />
            ) : (
              <Select placeholder="Ch???n th????ng hi???u">
                {subOptions?.length > 0 &&
                  subOptions?.map((v, i) => (
                    <Option key={v._id} value={v._id}>
                      {v.name}
                    </Option>
                  ))}
              </Select>
            )}
          </Form.Item>
        )}
        <Form.Item
          label="T???i ???nh L??n"
          name="image"
          rules={[
            {
              required: fileListImage.length < 1 || fileListImage.length < 4 ? true : false,
              message: 'Vui l??ng t???i 4 ???nh  l??n  !',
            },
          ]}
        >
          <Upload
            listType="picture-card"
            accept="images/*"
            fileList={fileListImage}
            onPreview={handlePreview}
            onChange={handleChange}
            multiple
          >
            {fileListImage.length >= 6 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>T???i ???nh l??n</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={() => {
            setPreviewVisible(false);
          }}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <Form.Item>
          <Button style={{ marginTop: '10px' }} type="primary" htmlType="submit" loading={loading}>
            Th??m s???n ph???m
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
