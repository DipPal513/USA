import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import useFetch from "@/hooks/useFetch";
import { TITLE } from "@/utils/api";
import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";

export default function Advisor() {
  const { data, loading } = useFetch("/history");
  return (
    <>
      <Head>
        <title>HISTORY:: {TITLE}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./shreepur.jpeg" />
      </Head>
      <main>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="headerTitle mt-3">
              <h3 className="headerTitleMain">সংগঠনটির ইতিহাস</h3>
            </div>
            {/* History Details */}
            <Container className="mb-5">
              <Row>
                <Col md={10} sm={12} className="mx-auto" data-aos="fade-up">
                  <p style={{ lineHeight: 1.7, fontFamily: "Poppins" }}>
                    {data?.data[0]?.dureg}
                  </p>
                </Col>
              </Row>
            </Container>
          </>
        )}
      </main>
    </>
  );
}
