import HeroSection from "@/components/banner/HeroSection";
import ProposalSection from "@/components/banner/ProposalSection";
import CategorySection from "@/components/danhmuc/CategorySection";
import ProductSection from "@/components/product/ProductSection";
import React from "react";

const HomePage: React.FC = () => {
  const diamondProducts = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d7710a5b7cd575b75d42832882550af9aa10ae6f6b56dd1c2bf6c70b0a6253b6?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
      name: "Mặt dây Kim cương 21M043",
      price: "5.000.000 VNĐ",
      category: "Vòng cổ",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/db5f37e7bfeaa2ee49855aef3b9cfea9b57080375b6877261a7f39d81c964088?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
      name: "Mặt dây Kim cương 21M045",
      price: "9.999.999 VNĐ",
      category: "Vòng cổ",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a35fb450fba51f79234c3410efb28b6f7953edf00832363a598be4df0f853bad?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
      name: "Mặt dây Kim cương 21M046",
      price: "9.999.999 VNĐ",
      category: "Vòng cổ",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f2316210c74dd0637671751ca85abcc531c518eb93be1e1cbbc1197a09161780?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
      name: "Mặt dây Kim cương 20M173.1TH",
      price: "9.999.999 VNĐ",
      category: "Vòng cổ",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1e1efe64b2bec0c9c9322fce074012375b703388a2e2257b701e6accea179202?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
      name: "Nhẫn đá Peridot 22N299",
      price: "9.999.999 VNĐ",
      category: "Nhẫn",
    },
  ];

  const weddingProducts = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/71754e70cc8c05372737934dc3429e70fc333cd1b91e3357cff2eddfdc230b2b?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
      name: "Nhẫn cưới nữ đá CZ 22Q.016NC",
      price: "9.999.999 VNĐ",
      category: "Nhẫn",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/5fb7f345d148df26256044382f6a4761b09f34f1d611030650ff08a8ab02b447?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
      name: "Nhẫn cưới nam đá CZ 22K.016NC",
      price: "9.999.999 VNĐ",
      category: "Nhẫn",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3b49756e307353a092a337186d3f784059f08f0d7eee4639cc024c5d36538c91?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
      name: "Nhẫn cưới nữ đá CZ 22Q.013NC",
      price: "9.999.999 VNĐ",
      category: "Nhẫn",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ace332483ecc7818f8fcf75958be7486c02b56fe57828f1cd56fb2dabd604a06?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
      name: "Nhẫn cưới nam đá CZ 22K.013NC",
      price: "9.999.999 VNĐ",
      category: "Nhẫn",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3a9b59616ce27863de0a4dd75dce3ec5c00a1e4cf0f36c13ea19cf6a00ec99ec?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
      name: "Nhẫn cưới nữ đá CZ 22Q.063NC",
      price: "9.999.999 VNĐ",
      category: "Nhẫn",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f2316210c74dd0637671751ca85abcc531c518eb93be1e1cbbc1197a09161780?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
      name: "Mặt dây Kim cương 20M173.1TH",
      price: "9.999.999 VNĐ",
      category: "Vòng cổ",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f2316210c74dd0637671751ca85abcc531c518eb93be1e1cbbc1197a09161780?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
      name: "Mặt dây Kim cương 20M173.1TH",
      price: "9.999.999 VNĐ",
      category: "Vòng cổ",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f2316210c74dd0637671751ca85abcc531c518eb93be1e1cbbc1197a09161780?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
      name: "Mặt dây Kim cương 20M173.1TH",
      price: "9.999.999 VNĐ",
      category: "Vòng cổ",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f2316210c74dd0637671751ca85abcc531c518eb93be1e1cbbc1197a09161780?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
      name: "Mặt dây Kim cương 20M173.1TH",
      price: "9.999.999 VNĐ",
      category: "Vòng cổ",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f2316210c74dd0637671751ca85abcc531c518eb93be1e1cbbc1197a09161780?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
      name: "Mặt dây Kim cương 20M173.1TH",
      price: "9.999.999 VNĐ",
      category: "Vòng cổ",
    },
  ];

  return (
    <div className="flex overflow-hidden flex-col pb-2.5 bg-white">
      <HeroSection />
      <CategorySection />
      <ProductSection title="Sản phẩm mới nhất" products={diamondProducts} />
      <ProductSection title="Sản phẩm mới nhất" products={weddingProducts} />
      <ProposalSection />
    </div>
  );
};

export default HomePage;
