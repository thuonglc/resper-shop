import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
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
import { removeImage, updateProduct } from 'features/Admin/Product/pathAPI';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DescriptionCreate from './ProductCreate/DescriptionCreate';
const { Title } = Typography;
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
    lg: {
      span: 24,
    },
    xl: {
      span: 24,
    },
  },
  wrapperCol: {
    xs: {
      span: 0,
    },
    sm: {
      span: 24,
    },
  },
};

export default function FormProductEdit({ id_product, valuesEdit }) {
  const history = useHistory();
  const { Option } = Select;
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const dispatch = useDispatch();

  // dispatch API
  const actionGetCategories = () => dispatch(getCategories());
  const actionGetCategorySubs = (_id) => dispatch(getCategorySubs(_id));
  const actionUpdateProduct = (data, token) => dispatch(updateProduct(data, token));
  const actionRemoveImage = (data, token) => dispatch(removeImage(data, token));

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
  useEffect(() => {
    if (valuesEdit) {
      const { price, name, description, image, quantity, priceCompare, shipping, subs } =
        valuesEdit;
      form.setFieldsValue({
        price: price,
        name: name,
        quantity: quantity,
        priceCompare: priceCompare,
        shipping: shipping,
      });
      setBody(description?.length > 0 ? description : '');
      setSubOptions(subs);
      setShowSub(true);
      if (image) {
        setFileListImage(image);
      }
    } // eslint-disable-next-line
  }, [valuesEdit]);

  const onFinish = async (values) => {
    if (values) {
      const { name, price, priceCompare, shipping, quantity, color, brand, category, subs } =
        values;
      const formData = new FormData();

      if (id_product) {
        setLoading(true);
        const imageOld = [];
        if (fileListImage.length < 4) {
          message.error('Vui l??ng t???i l??n 4 ???nh!');
        } else {
          for (let index = 0; index < fileListImage.length; index++) {
            const element = fileListImage[index];
            if (element.uid) {
              formData.append('image', fileListImage[index].originFileObj);
            }
            if (element.url) {
              imageOld.push(fileListImage[index]);
            }
          }
          const productUpdate = {
            name,
            description: body,
            price,
            priceCompare,
            shipping,
            quantity,
            color,
            brand,
            category,
            subs,
            imageOld: imageOld,
            id_product: id_product,
          };
          formData.append('product', JSON.stringify(productUpdate));
          const resultProduct = await actionUpdateProduct(formData, token);
          const resProduct = unwrapResult(resultProduct);
          if (resProduct) {
            setLoading(false);
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
            history.push('/admin/product');
            notification['success']({
              message: 'Th??ng B??o!',
              description: 'C???p nh???t th??nh c??ng',
            });
          }
        }
      }
      setLoading(true);
    }
  };

  const handleChangeQuill = (e) => {
    setBody(e);
  };

  const handleChangeCategory = async (value) => {
    const subs = await actionGetCategorySubs(value);
    const resSubs = unwrapResult(subs);
    if (resSubs) {
      setSubOptions(resSubs);
      setShowSub(true);
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
      message.error('B???n ch??? c?? th??? t???i l??n t???p JPG / PNG / JPEG!');
    }
    if (!isLt2M) {
      message.error('H??nh ???nh ph???i nh??? h??n 2mb!');
    }
    if (isJpgOrPng && isLt2M) {
      setFileListImage(fileList);
    }
  };

  const handleRemoveImage = async (file) => {
    setLoading(true);
    // remove image on cloudinary by public_id
    const data = { public_id: file.id };
    const resCloud = await actionRemoveImage(data, token);
    const res = unwrapResult(resCloud);
    //if not find image on cloudinary -> remove failed
    if (res.err.result === 'not found') {
      setLoading(false);
      notification['error']({
        message: 'Th??ng B??o!',
        description: 'X??a ???nh th???t b???i',
      });
    } else {
      setLoading(false);
      let filteredImages = fileListImage.filter((item) => {
        return item.id !== file.id;
      });
      setFileListImage(filteredImages);
    }
  };
  return (
    <>
      {loading && <SimpleBackdrop />}
      <Title level={4}>Edit A Product</Title>
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
          label="Gi?? ti???n ???? gi???m"
          name="priceCompare"
          rules={[{ required: true, message: 'Vui l??ng nh???p gi?? ti???n ???? gi???m' }]}
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
              Yes
            </Radio>
            <Radio value="No" defaultChecked>
              No
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
              required: fileListImage.length < 1 || fileListImage.length < 6 ? true : false,
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
            onRemove={handleRemoveImage}
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
            C???p nh???t
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
