import Head from "next/head";

import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import useFetch from "@/hooks/useFetch";
import { TITLE } from "@/utils/api";
import { baseImgUrl } from "@/utils/imgUrl";
import { Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Link from "next/link";

export default function Bank() {
  const { data, loading } = useFetch("/committee_view/1");
  return (
    <>
      <Head>
        <title>কেন্দ্রীয় কমিটি:: {TITLE}</title>
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
              <h3 className="headerTitleMain">কেন্দ্রীয় কমিটি</h3>
            </div>
            {/* Alumni Details */}
            <Container className="mt-4 mb-5">
              <Row>
                <Col md={10} sm={12} className="mx-auto">
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>কার্যকাল</th>
                        <th>কমিটির নাম</th>
                        <th>বিস্তারিত</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.data?.map((item) => (
                        <tr key={item?.id}>
                          <td>{item?.text4}</td>
                          <td>{item?.title}</td>
                          <td>
                            <Link href={baseImgUrl + item?.image}>বিস্তারিত</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>
          </>
        )}
      </main>
    </>
  );
}
