import {
  Document,
  View,
  StyleSheet,
  Page,
  Text,
  Image,
} from "@react-pdf/renderer";
import React from "react";
import { handleDateFormat } from "../../../../../main/utils/functions";
const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    marginBottom: 10,
    marginLeft: 10,
  },
});

const DocumentDownload = (props) => {
  const { model, backEndId } = props;

  const QRCodeView = () => {
    return (
      <View style={{ margin: 10, padding: 10 }}>
        <Image
          src={document.getElementById(`reservation${backEndId}`).toDataURL()}
          style={{ width: "150px" }}
        />
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ textAlign: "center" }}>
          {" "}
          <Text> RESERVATION DETAILS </Text>{" "}
        </View>
        <View style={styles.section}>
          <Text>Start Time</Text>
          <Text>{handleDateFormat(model.startTime)}</Text>
        </View>
        <View style={styles.section}>
          <Text>End Time</Text>
          <Text>{handleDateFormat(model.endTime)}</Text>
        </View>
        <View style={styles.section}>
          <Text>Client Id</Text>
          <Text>{model.clientId}</Text>
        </View>
        <View style={styles.section}>
          <Text>Service Name</Text>
          <Text>{model.serviceName}</Text>
        </View>
        <View style={styles.section}>
          <Text>Client Name</Text>
          <Text>{model.clientName}</Text>
        </View>
        <View style={styles.section}>
          <Text>Phone Number</Text>
          <Text>{model.phoneNumber}</Text>
        </View>
        <View style={styles.section}>
          <Text>Email</Text>
          <Text>{model.email}</Text>
        </View>
        <View style={styles.section}>
          <QRCodeView />
        </View>

        <View>
          <Text style={{ fontSize: "12px", marginLeft: 12 }}>
            Ruani bileten nqs doni te anulloni rezervimin
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default DocumentDownload;
